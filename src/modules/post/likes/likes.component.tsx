// libs
import { type FC, useState, useEffect, memo, useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { find } from 'lodash';
import { useSession } from 'next-auth/react';
import type { Like } from '@prisma/client';
import toast from 'react-hot-toast';

// utils
import { LikeOutline, LikeFilled } from '~/utils/svgs';
import { COLOR_PRIMARY, LOGIN_LIKE } from '~/utils/conts';
import { api } from '~/utils/api';
import useDebounceFn from '~/hooks/useDebounceFn';

dayjs.extend(relativeTime);

interface ComponentProps {
  likes: [Like];
  postId: string;
}

const Likes: FC<ComponentProps> = ({ postId, likes }) => {
  const { data } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(likes.length);

  const userLikedPost: Like | boolean = useMemo(() => {
    if (!data) return false;
    return find(likes, { userId: data?.user.id ?? '' }) ?? false;
  }, [data]);

  useEffect(() => {
    if (data) setIsLiked(userLikedPost ? true : false);
  }, [data]);

  const { mutate } = api.likes.handleLike.useMutation({
    onSuccess: (response) => {
      console.log('success like:', response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const debouceMutation = useDebounceFn(mutate, 450);

  const handleClick = () => {
    if (data?.user.id) {
      setCount((state) => {
        if (isLiked) return state - 1;
        else return state + 1;
      });
      setIsLiked((state) => !state);

      debouceMutation({
        postId,
        likeId: userLikedPost ? userLikedPost.id : '',
      });
    } else {
      toast.error(LOGIN_LIKE);
    }
  };

  const LikeSvg = () => {
    const COMPONENT = isLiked ? LikeFilled : LikeOutline;

    return COMPONENT(24, 24, COLOR_PRIMARY);
  };

  return (
    <div
      onClick={() => handleClick()}
      className='flex cursor-pointer'>
      <LikeSvg />
      <span className="ml-3">{count}</span>
    </div>
  );
};

export default memo(Likes);