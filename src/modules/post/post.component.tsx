// libs
import type { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@prisma/client';
import type { User } from '@prisma/client';

// utils
import { Comment, Like, Retweet } from '~/utils/svgs';
import { COLOR_PRIMARY } from '~/utils/conts';

dayjs.extend(relativeTime);

interface ComponentProps {
  user: User,
  post: Post,
}

const Post: FC<ComponentProps> = ({ post, user }) => {
  console.log(post);
  return (
    <div className="flex items-start p-3 w-full border-b border-slate-600">
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
      <div className="flex flex-col flex-grow">
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
        <div className="flex justify-between w-full pt-4 pr-8">
          <div className='flex'>
            {Comment(24, 24, COLOR_PRIMARY)}
            <span className="ml-3">0</span>
          </div>
          <div className='flex'>
            {Like(24, 24, COLOR_PRIMARY)}
            <span className="ml-3">{post?.likes}</span>
          </div>
          <div className='flex'>
            {Retweet(24, 24, COLOR_PRIMARY)}
            <span className="ml-3">{post?.retweets}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;