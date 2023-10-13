// libs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Image from 'next/image';
import Link from 'next/link';
import { type RouterOutputs } from "~/utils/api";

type PostType = RouterOutputs['posts']['getAll'][number];

dayjs.extend(relativeTime);

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

export default Post;