// libs
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as yup from "yup";

// utils
import { Return, Twitter } from '~/utils/svgs';
import { COLOR_PRIMARY } from '~/utils/conts';
import { api } from '~/utils/api';

// components
import FormError from '../forms/error.component';
import { LoadingOverlay } from '../spinner/loading.component';

export const schemaValidation = yup
  .object({
    username: yup.string().required().min(3).max(36).trim()
    // .matches(/^[a-zA-Z0-9_-]$/, {
    //   message: 'Handle can\'t contain symbols'
    // }),
  })
  .required()

type FormData = {
  username: string;
}

const HandleChange = () => {
  const { data: session, update } = useSession();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });

  const { data: handleCheck, refetch } = api.profile.checkHandleAvailability.useQuery({
    username: watch('username'),
  }, {
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (handleCheck) {
      // show error in tostrrr
      toast.dismiss();
      toast.error('Handle is taken');
    }
  }, [handleCheck]);

  const { mutate, isLoading } = api.profile.updateHandle.useMutation({
    onSuccess: async (response) => {
      toast.success(`Congrats! Your new @handle is ${response.username}`);
      await update(); 
    },
    onError: (error) => {
      // show error in tostrrr
      toast.error(error.message);
    },
  });

  const onFormSubmit = useCallback(async (data: FormData) => {
    const { data: refetchedData } = await refetch();

    // no users have that handle
    if (refetchedData === null) {
      mutate({ ...data, id: session?.user.id ?? '' });
    }
  }, []);

  const triggerSubmit = useCallback((e) => {
    if (e.code === 'Enter') handleSubmit(onFormSubmit);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isLoading && <LoadingOverlay />}
      <div className="w-96">
        {Twitter(50, 50, COLOR_PRIMARY)}
        <h2 className="text-3xl font-extralight">Welcome, {session?.user?.name}</h2>
        <p>Please take a moment and choose your @handle</p>
        <form onSubmit={handleSubmit(onFormSubmit)} className="mt-16">
          <label className='flex items-center mb-4 relative'>
            <div className="absolute right-4 top-4">{Return(22, 22, COLOR_PRIMARY)}</div>
            <span className="text-amber-600 text-4xl font-semibold pr-2">@</span>
            <input
              {...register('username')}
              onKeyUp={triggerSubmit}
              type='text'
              className="bg-gray-800 w-full outline-none p-1 pr-14 rounded-lg border-b border-slate-400 h-14 text-2xl font-light"
            />
          </label>
          {errors && errors?.username ? <FormError message={errors.username.message!} /> : null}
        </form>
      </div>
    </div>
  )
}

export default HandleChange;