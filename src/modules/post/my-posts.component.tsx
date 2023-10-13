// libs
import type { FC } from 'react';

// utils
import { api } from "~/utils/api";
import { NO_POSTS, POSTS_GET_ERROR } from '~/utils/conts';
import { LoadingOverlay } from '../spinner/loading.component';

// components
import Post from './post.component';

interface MyPostsProps {
  userId: string;
}

const MyPosts: FC<MyPostsProps> = ({ userId }) => {
  const { data, isLoading, isError } = api.posts.getPostByUserId.useQuery({ userId });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return <div>{POSTS_GET_ERROR}</div>
  }

  return (
    <div className="flex flex-col">
      {data?.length ? data.map((item) => <Post key={item.post.id} {...item} />) : NO_POSTS}
    </div>
  )
};

export default MyPosts;