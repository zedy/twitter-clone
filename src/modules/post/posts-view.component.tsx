// utils
import { api } from "~/utils/api";
import { NO_POSTS, POSTS_GET_ERROR } from '~/utils/conts';
import { LoadingOverlay } from '../spinner/loading.component';

// components
import Post from './post.component';

const PostsView = () => {
  const { data, isLoading, isError } = api.posts.getAll.useQuery();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return <div>{POSTS_GET_ERROR}</div>
  }

  return (
    <div className="flex flex-col">
      {data?.length ? data.map((post) => <Post key={post.id} post={post} user={post.User} />) : NO_POSTS}
    </div>
  )
}

export default PostsView;