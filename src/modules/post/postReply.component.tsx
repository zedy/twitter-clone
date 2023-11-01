// libs
import { type FC, useRef, useState, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSession } from 'next-auth/react';

// utils
import { api } from '~/utils/api';

// components
import { Spinner } from '../spinner/loading.component';
import { useRouter } from 'next/router';

type FormData = {
  content: string;
}

interface ComponentProps {
  isModal?: boolean;
}

const PostReply: FC<ComponentProps> = ({ isModal = false }) => {
  const { data } = useSession();
  const textAreaRef = useRef(null);
  const apiCtx = api.useContext();
  const [active, setActive] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isModal) {
      setActive(true);
    }
  }, []);

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

  const { ref, ...rest } = register('content');

  const { mutate, isLoading } = api.posts.reply.useMutation({
    onSuccess: async () => {
      await apiCtx.posts.getPostById.invalidate();
    },
    onError: (error) => {
      // show error in tostrrr
      // server error
      toast.error(error.message);
    },
  });

  const handleFocus = () => {
    if (!isModal) {
      setActive(true);
    }
  }

  const onFormSubmit = (data: FormData) => {
    mutate({ content: data.content, postId: router.query.id! as string });
    reset();
  }

  if (errors?.content?.message) {
    toast.error(errors.content.message);
  }

  return (
    <div className='post-wizzard flex w-full'>
      <div className="rounded-full mr-2 overflow-hidden" style={{ minWidth: '40px', height: '40px' }}>
        {data?.user ? (
          <Image
            src={data.user.image?.toString() ?? ''}
            alt='profile image'
            width={40}
            height={40}
            className="object-contain"
            loading={'eager'}
          />
        ) : (
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -top-1 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
        )
        }
      </div>
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
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
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

export default PostReply;