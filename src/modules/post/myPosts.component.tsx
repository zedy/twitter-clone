// libs
import type { FC } from 'react';

// utils
import { api } from "~/utils/api";
import { NO_POSTS, POSTS_GET_ERROR } from '~/utils/conts';
import { LoadingSection } from '../spinner/loading.component';

// components
import Post from './post.component';

interface MyPostsProps {
  userId: string;
}

const MyPosts: FC<MyPostsProps> = ({ userId }) => {
  const { data, isLoading, isError } = api.posts.getPostByUserId.useQuery({ userId });

  if (isError) {
    return <div>{POSTS_GET_ERROR}</div>
  }

  return (
    <div className="flex flex-col">
      {isLoading && <div className='mt-10'><LoadingSection /></div>}
      {data?.length ? data.map((post) => <Post key={post.id} post={post} user={post.User} />) : <p className="p-5 text-center">{NO_POSTS}</p>}
    </div>
  )
};

export default MyPosts;