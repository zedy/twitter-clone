// libs
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from "yup";

// utils
import { api } from '~/utils/api';

// components
import FormError from '../forms/error.component';

export const schemaValidation = yup
  .object({
    password: yup.string().required().trim(),
    email: yup.string().email().required().min(8).max(36),
  })
  .required()

type FormData = {
  password: string;
  email: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });

  const { mutate, isLoading } = api.profile.createAccount.useMutation({
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      // show error in tostrrr
      // toast.error(error.message);
      // setIsLoading(false);
      console.log(error);
    },
  });

  const onFormSubmit = (data: FormData) => {
    // console.log(data);
    // mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onFormSubmit)} className="mt-2">
        <label className='flex flex-col mb-4 relative'>
          <span>Email *</span>
          <input
            {...register('email')}
            type='email'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.email ? <FormError message={errors.email.message!} /> : null}
        </label>
        <label className='flex flex-col mb-4 relative'>
          Password *
          <input
            {...register('password')}
            type='password'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.password ? <FormError message={errors.password.message!} /> : null}
        </label>
        <button
          type='submit'
          className="h-12 mt-12 font-bold transition-all text-amber-600 border-amber-600 border-2 rounded-full w-full hover:bg-amber-600 hover:text-slate-800"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default SignInForm;