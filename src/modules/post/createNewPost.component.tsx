// libs
import toast from 'react-hot-toast';

// utils
import { api } from '~/utils/api';

// components
import CreatePost from './wizzard/create.component';
import { GENERIC_ERROR } from '~/utils/conts';

type FormData = {
  content: string;
}

const CreateNewPost = () => {
  const apiCtx = api.useContext();

  const { mutate, isLoading, isError } = api.posts.create.useMutation({
    onSuccess: async () => {
      await apiCtx.posts.getAll.invalidate();
    },
    onError: (error) => {
      // show error in tostrrr
      // server error
      toast.error(error.message);
    },
  });

  const onFormSubmit = (data: FormData) => {
    mutate(data);
  }

  if (isError) {
    toast.error(GENERIC_ERROR);
  }

  return <CreatePost text={'What\'s happening?'} isLoading={isLoading} callback={onFormSubmit} />
};

export default CreateNewPost;