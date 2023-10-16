// libs
import { type FC, useContext } from 'react';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import * as yup from "yup";
import dayjs from 'dayjs';

// utils
import { api } from '~/utils/api';

// components
import { LoadingBlocker } from '../spinner/loading.component';
import type { User } from '@prisma/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalContext } from '../context/modalContext';

export type FormData = {
  name: string;
  email: string;
  bio: string;
  username: string;
  title?: string | undefined;
  location?: string | undefined;
  dob?: Date | undefined;
}

interface FormProps {
  userData: User;
  callback: () => void;
  closeModal: () => void;
}

export const schemaValidation = yup
  .object({
    name: yup.string().required().min(3).max(255),
    email: yup.string().email().required().min(8).max(255),
    bio: yup.string().required().min(1).max(255),
    username: yup.string().required(),
    title: yup.string().max(64),
    location: yup.string().max(128),
    dob: yup.date(),
  })
  .required()

const EditProfileForm: FC<FormProps> = ({ userData, callback, closeModal }) => {
  const { setIsLoading } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });

  const onFormSubmit = (data: FormData) => {
    setIsLoading(true);

    /**
     * Reason behind this is when a new user is being created by the oauth callback
     * it only has the name and email and will use them to create a new User so all other fields
     * in the db.schema have to nullable while in the form we can't have them otherwise yup
     * will throw errors. 
     * 
     * I'd rather just ignore this for now then spend time refactoring.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutate(data);
  };

  const { mutate, isLoading } = api.profile.update.useMutation({
    onSuccess: () => {
      callback();
      setIsLoading(false);
      closeModal();
    },
    onError: (error) => {
      // show error in tostrrr
      setIsLoading(false);
      toast.error(error.message);
    },
  });

  // move to a form.component?
  const Error: FC<{ message: string }> = ({ message }) => (
    <span className="text-red-800">{message}</span>
  );

  return (
    <div className="post-wizzard items-center w-full">      
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-full flex-col"
      >
        {isLoading ? <LoadingBlocker /> : <div />}
        <input
          {...register('username')}
          defaultValue={userData?.username ?? ''}
          type='hidden'
        />

        <label className='flex flex-col mb-4'>
          Name
          <input
            {...register('name')}
            defaultValue={userData?.name ?? ''}
            type='text'
            className="bg-gray-800 outline-none p-1 rounded border-b border-slate-400"
          />
          {errors && errors?.name ? <Error message={errors.name.message!} /> : null}
        </label>

        <label className='flex flex-col mb-4'>
          E-mail
          <input
            {...register('email')}
            defaultValue={userData?.email ?? ''}
            type='email'
            className="bg-gray-800 outline-none p-1 rounded border-b border-slate-400"
          />
          {errors && errors?.email ? <Error message={errors.email.message!} /> : null}
        </label>

        <label className='flex flex-col mb-4'>
          Title
          <input
            {...register('title')}
            defaultValue={userData?.title ?? ''}
            type='text'
            className="bg-gray-800 outline-none p-1 rounded border-b border-slate-400"
          />
        </label>

        <label className='flex flex-col mb-4'>
          Bio
          <textarea
            {...register('bio')}
            defaultValue={userData?.bio ?? ''}
            className="bg-gray-800 outline-none p-1 rounded border-b border-slate-400"
          />
          {errors && errors?.bio ? <Error message={errors.bio.message!} /> : null}
        </label>

        <hr className='bg-slate-400 mb-2' />

        <label className='flex flex-col mb-4'>
          Location
          <input
            {...register('location')}
            defaultValue={userData?.location ?? ''}
            type='text'
            className="bg-gray-800 outline-none p-1 rounded border-b border-slate-400"
          />
        </label>

        <label className='flex flex-col mb-4'>
          Date of birth
          <input
            {...register('dob')}
            defaultValue={userData?.dob ? dayjs(userData?.dob).format('YYYY-MM-DD') : ''}
            type='date'
            className="bg-gray-800 outline-none p-1 rounded border-b border-slate-400"
          />
        </label>

        <button
          type='submit'
          className='border border-amber-600 text-amber-600 px-6 h-12 rounded-3xl hover:bg-amber-600 hover:text-slate-900'>
          Save profile
        </button>

      </form>
    </div>
  );
};

export default EditProfileForm;