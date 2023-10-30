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

dayjs.extend(relativeTime);

export interface PostWithUser extends PostType {
  User: User;
  likes: [Like];
  replies: [PostType];
}

interface ComponentProps {
  post: PostWithUser,
}

const Post: FC<ComponentProps> = ({ post }) => {
  function TweetActions() {
    return (
      <div className="flex justify-between w-full pt-4 pr-8">
        <Replies post={post} />
        <Likes postId={post.id} likes={post?.likes as [Like]} />
        <div className='flex'>
          {Retweet(24, 24, COLOR_PRIMARY)}
          <span className="ml-3">{post?.retweets}</span>
        </div>
      </div>
    );
  }

  return defaultTweetBody(false, post, <TweetActions />)
};

export default memo(Post);