// libs
import { type FC, useState, useEffect, memo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import type { Like } from '@prisma/client';
import toast from 'react-hot-toast';

// hooks
import { Modal, useModal } from '~/hooks/useModal';
import useDebounceFn from '~/hooks/useDebounceFn';

// utils
import { ReplyFilled, ReplyOutline } from '~/utils/svgs';
import { COLOR_PRIMARY, LOGIN_REPLY } from '~/utils/conts';
import { api } from '~/utils/api';
import type { PostWithUser } from '../post.component';
import { defaultTweetBody } from '../post-body.component';
import PostReply from '../post-reply.component';

dayjs.extend(relativeTime);

interface ComponentProps {
  replies: any;
  post: PostWithUser;
}

const Replies: FC<ComponentProps> = ({ post, replies }) => {
  const { data } = useSession();
  const { openModal, modalProps } = useModal();
  const [hasCommented, setHasCommented] = useState<boolean>(false);
  const [count, setCount] = useState<number>(replies.length);

  //  const userLikedPost: Like | boolean = find(likes, { userId: data?.user.id ?? '' }) ?? false;

  useEffect(() => {
    setHasCommented(replies.length > 0 ? true : false);
  }, []);

  const { mutate } = api.likes.handleLike.useMutation({
    onSuccess: (response) => {
      console.log('success like:', response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClick = () => {
    if (data?.user.id) {
      openModal();
    } else {
      toast.error(LOGIN_REPLY);
    }
  };

  const ReplySvg = () => {
    const COMPONENT = hasCommented ? ReplyFilled : ReplyOutline;

    return COMPONENT(24, 24, COLOR_PRIMARY);
  };

  return (
    <>
      <Modal
        {...modalProps}
        title='Leave a reply'
      >
        <div className="m-auto">
          {defaultTweetBody(true, post)}
          <PostReply isModal={true} />
        </div>
      </Modal>
      <div
        onClick={() => handleClick()}
        className='flex cursor-pointer'>
        <ReplySvg />
        <span className="ml-3">{count}</span>
      </div>
    </>
  );
};

export default memo(Replies);