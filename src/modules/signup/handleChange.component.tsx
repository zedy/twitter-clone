import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormError from '../forms/error.component';
import { Return, Twitter } from '~/utils/svgs';
import { COLOR_PRIMARY } from '~/utils/conts';
import { useSession } from 'next-auth/react';

export const schemaValidation = yup
  .object({
    handle: yup.string().required().min(3).max(16).trim().matches(/^(\S+$)/g, '* This field cannot contain only blankspaces'),
  })
  .required()

type FormData = {
  handle: string;
}

const HandleChange = () => {
  const { data } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });

  const onFormSubmit = (data: FormData) => {
    console.log('submit');
    console.log(data);
  }

  const triggerSubmit = (e: KeyboardEvent) => {
    if (e.code === 'Enter') handleSubmit(onFormSubmit);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-96">
        {Twitter(50, 50, COLOR_PRIMARY)}
        <h2 className="text-3xl font-extralight">Welcome, {data?.user?.name}</h2>
        <p>Please take a moment and choose your @handle</p>
        <form onSubmit={handleSubmit(onFormSubmit)} className="mt-16">
          <label className='flex items-center mb-4 relative'>
            <div className="absolute -right-2 top-4">{Return(22, 22, COLOR_PRIMARY)}</div>
            <span className="text-amber-600 text-4xl font-semibold pr-2">@</span>
            <input
              {...register('handle')}
              onKeyUp={(e) => triggerSubmit(e)}
              type='text'
              className="bg-gray-800 outline-none p-1 rounded rounded-lg border-b border-slate-400 h-14 text-2xl font-light"
            />
          </label>
          {errors && errors?.handle ? <FormError message={errors.handle.message!} /> : null}
          {/* <button className="" type='submit'>Submit</button> */}
        </form>
      </div>
    </div>
  )
}

export default HandleChange;