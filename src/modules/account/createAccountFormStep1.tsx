// libs
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext } from 'react';
import dayjs from 'dayjs';

// components
import FormError from '../forms/error.component';
import { SignupContext } from '../context/signupContext';

export const schemaValidation = yup
  .object({
    username: yup.string().required().min(3).max(36).trim(),
    email: yup.string().email().required().min(8).max(36),
    name: yup.string().required().min(3).max(36),
    dob: yup.date().required(),
  })
  .required()

type FormData = {
  username: string;
  email: string;
  name: string;
  dob: Date;
}

const CreateAccountFormStep1 = () => {
  const { dispatch, state } = useContext(SignupContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });

  const onFormSubmit = (data: FormData) => {
    dispatch({
      type: 'basic_info',
      payload: {
        ...data,
      }
    });
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onFormSubmit)} className="mt-2">
        <label className='flex flex-col mb-4 relative'>
          <span>Name *</span>
          <input
            {...register('name')}
            defaultValue={state.fields.name}
            type='text'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.name ? <FormError message={errors.name.message!} /> : null}
        </label>
        <label className='flex flex-col mb-4 relative'>
          @Handle *
          <input
            {...register('username')}
            defaultValue={state.fields.username}
            type='text'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.username ? <FormError message={errors.username.message!} /> : null}
        </label>
        <label className='flex flex-col mb-4 relative'>
          Email *
          <input
            {...register('email')}
            defaultValue={state.fields.email}
            type='email'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.email ? <FormError message={errors.email.message!} /> : null}
        </label>
        <label className='flex flex-col mb-4 relative'>
          Date of birth *
          <input
            {...register('dob')}
            defaultValue={state.fields.dob ? dayjs(state.fields.dob).format('YYYY-MM-DD') : ''}
            type='date'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.dob ? <FormError message={errors.dob.message!} /> : null}
        </label>
        <p className="font-thin text-xs">
          By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
        </p>
        <button
          type='submit'
          className="h-12 mt-12 font-bold transition-all text-amber-600 border-amber-600 border-2 rounded-full w-full hover:bg-amber-600 hover:text-slate-800"
        >
          Next
        </button>
      </form>
    </div>
  )
}

export default CreateAccountFormStep1;