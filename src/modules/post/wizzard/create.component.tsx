// libs
import { type FC, useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// components
import UserProfilePicture from '~/modules/profile/avatar.component';
import { Spinner } from '~/modules/spinner/loading.component';

type FormData = {
  content: string;
}

interface ComponentProps {
  isModal?: boolean;
  callback: (arg0: FormData) => void;
  isLoading: boolean;
}

const schema = yup
.object({
  content: yup.string().required().min(1).max(255),
})
.required()

const CreatePost: FC<ComponentProps> = ({ isModal = false, callback, isLoading }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (isModal) {
      setActive(true);
    }
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { ref, ...rest } = register('content');

  const handleFocus = () => {
    if (!isModal) {
      setActive(true);
    }
  }

  const onFormSubmit = (data: FormData) => {
    callback({ content: data.content });
    reset();
  }

  // delete?
  if (errors?.content?.message) {
    toast.error(errors.content.message);
  }

  return (
    <div className='post-wizzard flex w-full'>
      <UserProfilePicture />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onFormSubmit)}
        onFocus={handleFocus}
        className={`flex w-full ${active ? 'flex-col items-end' : 'items-start'}`}
      >
        <textarea {...rest} name="content" ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
          onChange={() => {
            textAreaRef.current!.style.height = "auto";
            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
          }}
          placeholder="Leave a reply ..."
          className="bg-gray-800 w-full resize-none mb-3 overflow-y-hidden grow outline-none p-1 pl-2 rounded-2xl"
        />
        <button
          disabled={isLoading}
          className={`text-amber-600 ${!active ? 'ml-5 mt-4' : ''}`}
        >{isLoading ? <Spinner /> : 'Post'}</button>
      </form>
    </div>
  );
};

export default CreatePost;