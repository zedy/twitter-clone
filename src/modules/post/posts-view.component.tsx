// libs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// utils
import Image from 'next/image';
import { type RouterOutputs, api } from "~/utils/api";
import { NO_POSTS, POSTS_GET_ERROR } from '~/utils/conts';
import { LoadingOverlay } from '../spinner/loading.component';
import Link from 'next/link';

dayjs.extend(relativeTime);

type PostType = RouterOutputs['posts']['getAll'][number];

const PostsView = () => {
  const { data, isLoading, isError } = api.posts.getAll.useQuery();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return <div>{POSTS_GET_ERROR}</div>
  }

  const Post = (props: PostType) => {
    const { post, author } = props;
    return (
      <div className="flex items-center p-3">
        <div className="rounded-full overflow-hidden mr-3">
          <Link href={`/@${author?.userName}`}>
            <Image
              src={author?.imageUrl ?? ''}
              alt={author?.userName ?? ''}
              width={48}
              height={48}
            /></Link>
        </div>
        <div className="flex flex-col">
          <div>
            <Link href={`/@${author?.userName}`}><b>{`@${author?.userName}`}</b></Link> • <Link href={`/post/${post.id}`}><span className="font-thin text-sm text-slate-300 hover:underline">{dayjs(post.createdAt).fromNow()}</span></Link>
          </div>
          <div>
            {post.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {data?.length ? data.map((item) => <Post key={item.post.id} {...item} />) : NO_POSTS}
    </div>
  )
}

export default PostsView;