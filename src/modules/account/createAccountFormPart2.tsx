// libs
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from "yup";
import { useContext } from 'react';

// utils
import { api } from '~/utils/api';

// components
import FormError from '../forms/error.component';
import { ModalContext } from '../context/modalContext';
import { SignupContext, Step } from '../context/signupContext';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

export const schemaValidation = yup
  .object({
    password: yup.string().required().min(8).max(16).trim()
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    passwordVerify: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
  })
  .required()

type FormData = {
  password: string;
  passwordVerify?: string | undefined;
}

const CreateAccountFormStep2 = () => {
  const { setIsLoading } = useContext(ModalContext);
  const { state, dispatch } = useContext(SignupContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });

  const { mutate } = api.profile.createAccount.useMutation({
    onSuccess: () => {
      setIsLoading(false);
      dispatch({
        type: 'final',
      })
    },
    onError: (error) => {
      // show error in tostrrr
      toast.error(error.message);
      setIsLoading(false);
      dispatch({
        type: 'step',
        payload: {
          step: Step.step1,
        }
      })
    },
  });

  const onFormSubmit = (data: FormData) => {
    setIsLoading(true);
    dispatch({
      type: 'password', payload: {
        ...data,
      }
    });
    mutate(Object.assign({
      ...state.fields,
      ...data,
    }, { handleChosen: true }));
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onFormSubmit)} className="mt-2">
        <label className='flex flex-col mb-4 relative'>
          Password *
          <input
            {...register('password')}
            type='password'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.password ? <FormError message={errors.password.message!} /> : null}
        </label>
        <label className='flex flex-col mb-4 relative'>
          Retype password *
          <input
            {...register('passwordVerify')}
            type='password'
            className="bg-gray-800 w-full outline-none p-1 rounded-lg border-b border-slate-400 h-12 text-xl font-light"
          />
          {errors && errors?.passwordVerify ? <FormError message={errors.passwordVerify.message!} /> : null}
        </label>
        <button
          type='submit'
          className="h-12 mt-12 font-bold transition-all text-amber-600 border-amber-600 border-2 rounded-full w-full hover:bg-amber-600 hover:text-slate-800"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateAccountFormStep2;