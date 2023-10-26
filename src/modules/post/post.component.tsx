// libs
import { type FC, memo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import type { Post as PostType } from '@prisma/client';
import type { Like, User } from '@prisma/client';

// utils
import { Retweet } from '~/utils/svgs';
import { COLOR_PRIMARY } from '~/utils/conts';
import Replies from './replies/replies.component';
import Likes from './likes/likes.component';

dayjs.extend(relativeTime);

export interface PostWithUser extends PostType {
  User: User;
  likes: [Like];
}

interface ComponentProps {
  post: PostWithUser,
}

const Post: FC<ComponentProps> = ({ post }) => {
  function tweet(isReply = false) {
    return (
      <div className={`flex relative items-start w-ful ${isReply ? 'mb-8' : 'p-3 border-b border-slate-600'}`}>
        <div className="rounded-full overflow-hidden mr-3">
          <Link href={`/@${post?.User?.username}`}>
            <Image
              src={post?.User?.image ?? ''}
              alt={post?.User?.username ?? ''}
              width={isReply ? 40 : 48}
              height={isReply ? 40 : 48}
            />
          </Link>
        </div>
        <div className="flex flex-col flex-grow relative">
          {isReply && <div className="absolute -left-8 top-12 border-l-2 h-[calc(100%-20px)] border-slate-600"></div>}
          <div>
            <Link href={`/@${post?.User?.username}`}>
              <b>{post?.User?.name}</b>
              <span className="ml-2 font-thin text-sm text-slate-300">@{post?.User?.username}</span>
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
          {isReply ? <div className='text-slate-600 pt-3'>Replying to
            <Link href={`/@${post?.User?.username}`}>
              <span className='text-amber-600 pl-1'>
                @{post?.User?.username}
              </span>
            </Link>
          </div> : tweetActions()}
        </div>
      </div>
    );
  }

  function tweetActions() {
    return (
      <div className="flex justify-between w-full pt-4 pr-8">
        <Replies post={post} replies={[]} originalTweet={tweet} />
        <Likes postId={post.id} likes={post?.likes as [Like]} />
        <div className='flex'>
          {Retweet(24, 24, COLOR_PRIMARY)}
          <span className="ml-3">{post?.retweets}</span>
        </div>
      </div>
    );
  }

  return tweet();
};

export default memo(Post);