// libs
import { type FC, memo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';

dayjs.extend(relativeTime);

interface ComponentProps {
  post: Post,
}

const ReplyTweet: FC<ComponentProps> = ({ post }) => {
  const { data } = useSession();

  return (
    <div className="flex items-start p-3 w-full">
      <div className="rounded-full overflow-hidden mr-3">
        <Link href={`/@${data?.user?.username}`}>
          <Image
            src={data?.user?.image ?? ''}
            alt={data?.user?.username ?? ''}
            width={48}
            height={48}
          />
        </Link>
      </div>
      <div className="flex flex-col flex-grow">
        <div>
          <Link href={`/@${data?.user?.username}`}>
            <b>{`${data?.user?.name}`}</b>
            <span className="ml-2 font-thin text-sm text-slate-300">@{data?.user?.username}</span>
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

export default memo(ReplyTweet);