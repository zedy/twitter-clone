// libs
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// utils
import { api } from '~/utils/api';

type FormData = {
  content: string;
}

// components
import { Spinner } from '../spinner/loading.component';

const CreatePostWizzard = () => {
  const { user } = useUser();
  const apiCtx = api.useContext();

  const schema = yup
    .object({
      content: yup.string().required().min(1).max(255),
    })
    .required()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = api.posts.create.useMutation({
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
    mutate({ content: data.content });
    reset();
  }

  if (errors?.content?.message) {
    toast.error(errors.content.message);
  }

  return (
    <div className="post-wizzard flex items-center w-full">
      <div className="rounded-full mr-2 overflow-hidden">
        {user ? (
          <Image src={user ? user.imageUrl : ''} alt='profile image' width={64} height={64} objectFit={'contain'} />
        ) : (
          <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-18 h-18 text-gray-400 top-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
        )
        }
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-full"
      >
        <input
          {...register('content')}
          type='text'
          placeholder="What's happening?"
          className="bg-transparent grow outline-none"
        />
        <button
          disabled={isLoading}
          className='test'
        >{isLoading ? <Spinner /> : 'Post'}</button>
      </form>
    </div>
  );
};

export default CreatePostWizzard;