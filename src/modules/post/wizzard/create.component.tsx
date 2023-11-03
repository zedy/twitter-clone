// libs
import { type FC, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// components
import UserProfilePicture from '~/modules/profile/avatar.component';
import { Spinner } from '~/modules/spinner/loading.component';
import AddMedia from './addMedia.component';

type FormData = {
  content: string;
}

export interface MediaCallbackData {
  type: string,
  payload: string,
}

interface ComponentProps {
  callback: (arg0: FormData) => void;
  isLoading: boolean;
  text: string;
}

const schema = yup
  .object({
    content: yup.string().required().min(1).max(255),
  })
  .required()

const CreatePost: FC<ComponentProps> = ({ text, callback, isLoading }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { ref, ...rest } = register('content');

  const onFormSubmit = (data: FormData) => {
    callback({ content: data.content });
    reset();
  }

  const handleMediaCallback = (data: MediaCallbackData) => {
    if (data.type === 'emoji') {
      textAreaRef.current!.value += data.payload;
    }
  }

  if (errors?.content?.message) {
    toast.error(errors.content.message);
  }

  return (
    <div className='post-wizzard flex w-full'>
      <UserProfilePicture />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onFormSubmit)}
        className='flex w-full flex-col items-end'
      >
        <textarea {...rest} name="content" ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
          onChange={() => {
            textAreaRef.current!.style.height = "auto";
            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
          }}
          placeholder={text}
          className="bg-gray-800 w-full resize-none mb-3 overflow-y-hidden grow outline-none p-1 pl-2 rounded-2xl"
        />
        <div className='flex w-full justify-between'>
          <AddMedia callback={handleMediaCallback} />
          <button
          disabled={isLoading}
          className='text-amber-600'
        >{isLoading ? <Spinner /> : 'Post'}</button>
        </div>        
      </form>
    </div>
  );
};

export default CreatePost;