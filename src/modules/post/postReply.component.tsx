// libs
import type { FC } from 'react';
import toast from 'react-hot-toast';

// utils
import { api } from '~/utils/api';

// components
import CreatePost from './wizzard/create.component';
import { GENERIC_ERROR } from '~/utils/conts';

type FormData = {
  content: string;
}

interface ComponentProps {
  postId: string;
  callback?: () => void;
}

const PostReply: FC<ComponentProps> = ({ postId, callback }) => {
  const apiCtx = api.useContext();

  const { mutate, isLoading, isError } = api.posts.reply.useMutation({
    onSuccess: async () => {
      await apiCtx.posts.getPostById.invalidate();
      callback && callback();
    },
    onError: (error) => {
      // show error in tostrrr
      // server error
      toast.error(error.message);
    },
  });

  const onFormSubmit = (data: FormData) => {
    mutate({ ...data, postId });
  }

  if (isError) {
    toast.error(GENERIC_ERROR);
  }

  return <CreatePost text={'Leave a reply'} callback={onFormSubmit} isLoading={isLoading} />
};

export default PostReply;