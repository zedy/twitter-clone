// libs
import { type FC, memo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

// hooks
import { Modal, useModal } from '~/hooks/useModal';

// utils
import { ReplyFilled, ReplyOutline } from '~/utils/svgs';
import { COLOR_PRIMARY, LOGIN_REPLY } from '~/utils/conts';
import type { PostWithUser } from '../post.component';
import { defaultTweetBody } from '../postBody.component';
import PostReply from '../postReply.component';

dayjs.extend(relativeTime);

interface ComponentProps {
  post: PostWithUser;
}

const Replies: FC<ComponentProps> = ({ post }) => {
  const { data } = useSession();
  const { openModal, closeModal, modalProps } = useModal();

  const handleClick = () => {
    if (data?.user.id) {
      openModal();
    } else {
      toast.error(LOGIN_REPLY);
    }
  };

  const ReplySvg = () => {
    const COMPONENT = post.replies.length > 0 ? ReplyFilled : ReplyOutline;

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
          <PostReply isModal={true} postId={post.id} callback={closeModal} />
        </div>
      </Modal>
      <div
        onClick={() => handleClick()}
        className='flex cursor-pointer'>
        <ReplySvg />
        <span className="ml-3">{post.replies.length}</span>
      </div>
    </>
  );
};

export default memo(Replies);