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
import { defaultTweetBody } from './post-body.component';
import ReplyTweet from './replies/reply-tweet';
import CreatePostWizzard from './post-wizzard.component';
import PostReply from './post-reply.component';

dayjs.extend(relativeTime);

export interface PostWithUser extends PostType {
  User: User;
  likes: [Like];
}

interface ComponentProps {
  post: PostWithUser,
}

const PostPage: FC<ComponentProps> = ({ post }) => {
  return (
    <div className='flex flex-col relative items-start w-ful p-3 border-b border-slate-600'>
      <div className="flex w-full">
        <Link className='rounded-full overflow-hidden mr-3' href={`/@${post?.User?.username}`}>
          <Image
            src={post?.User?.image ?? ''}
            alt={post?.User?.username ?? ''}
            width={48}
            height={48}
          />
        </Link>
        <div className='flex flex-col'>
          <b>{post?.User?.name}</b>
          <span className="font-thin text-sm text-slate-300">@{post?.User?.username}</span>
        </div>
      </div>
      <div className="flex flex-col flex-grow relative mt-3 w-full">
        <div>
          {post?.content}
        </div>
        <div>
          <span className="font-thin text-sm text-slate-300">
            {`${dayjs(post?.createdAt).format('HH:mm A')} - ${dayjs(post?.createdAt).format('MMM DD, YYYY')}`}
          </span>
        </div>
        <div className="flex justify-between w-full mt-5 p-2 pr-4 border border-l-0 border-r-0 border-slate-600">
          <Replies post={post} replies={[]} />
          <Likes postId={post.id} likes={post?.likes as [Like]} />
          <div className='flex'>
            {Retweet(24, 24, COLOR_PRIMARY)}
            <span className="ml-3">{post?.retweets}</span>
          </div>
        </div>
        <div className='mt-5'>
          <PostReply />
        </div>
      </div>
    </div>
  )
};

export default memo(PostPage);