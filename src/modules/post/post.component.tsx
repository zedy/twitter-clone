// libs
import type { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@prisma/client';
import type { User } from '@prisma/client';

dayjs.extend(relativeTime);

interface ComponentProps {
  user: User,
  post: Post,
}

const Post: FC<ComponentProps> = ({ post, user }) => {
  return (
    <div className="flex items-center p-3">
      <div className="rounded-full overflow-hidden mr-3">
        <Link href={`/@${user?.username}`}>
          {true ? (
            <Image
              src={user?.image ?? ''}
              alt={user?.username ?? ''}
              width={48}
              height={48}
            />
          ) : (
            <div>loading</div> // remove this user is always true ? 
          )}
        </Link>
      </div>
      <div className="flex flex-col">
        <div>
          <Link href={`/@${user?.username}`}>
            <b>{`${user?.name}`}</b>
            <span className="ml-2 font-thin text-sm text-slate-300">@{user?.username}</span>
          </Link>
          <span className="font-thin opacity-50"> • </span>
          <Link href={`/post/${post?.id}`}>
            <span className="font-thin text-sm text-slate-300 hover:underline">
              {dayjs(post?.createdAt).fromNow()}
            </span>
          </Link>
        </div>
        <div>
          {post?.content}
        </div>
      </div>
    </div>
  );
};

export default Post;