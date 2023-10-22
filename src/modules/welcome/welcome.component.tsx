// libs
import type { FC } from 'react';
import { signIn } from 'next-auth/react';

// hooks
import { Modal, useModal } from '~/hooks/useModal';

// utils
import { COLOR_PRIMARY } from '~/utils/conts';
import { Github, GoogleColor, Twitter } from '~/utils/svgs';
import type { HomeProps } from '~/pages';

function getProviderIcon(name: string) {
  switch (name) {
    case 'google':
      return GoogleColor(22, 22);
    case 'github':
      return Github(22, 22, 'fff');
  }
}

const WelcomeComponent: FC<HomeProps> = ({ providers }) => {
  const { openModal, modalProps } = useModal();

  const AuthProviderButtons: FC<{ isSignin: boolean }> = ({ isSignin }) => {
    return Object.values(providers).map((provider) => {
      return (
        <div key={provider.name} className="mt-1">
          <button
            className="flex items-center justify-center bg-transparent border-2 border-slate-600 rounded-full h-12 w-full font-bold hover:bg-slate-600 transition-all"
            onClick={() => void signIn(provider.id)}>
            <span className="mr-2">
              {getProviderIcon(provider.name.toLowerCase())}
            </span>
            {`Sign ${isSignin ? 'in' : 'up'} with ${provider.name}`}
          </button>
        </div>
      );
    })
  };

  return (
    <>
      <Modal
        {...modalProps}
        title='Sign In'
      >
        <div className="w-80 m-auto">
          <AuthProviderButtons isSignin={true} />
        </div>
      </Modal>
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="w-1/2 flex justify-center">
          {Twitter(250, 250, COLOR_PRIMARY)}
        </div>
        <div className="flex flex-col w-1/2">
          <h1 className="text-amber-600 text-6xl mb-16 font-bold">Happening Now</h1>
          <p className="text-2xl mb-8 font-bold">Join today.</p>
          <div className='flex flex-col justify-center max-w-xs'>
            <AuthProviderButtons isSignin={false} />
            <div className="flex">
              <div className="flex items-center flex-grow">
                <div className="h-1 border-b border-slate-600 w-full"></div>
              </div>
              <span className="p-4">or</span>
              <div className="flex items-center flex-grow">
                <div className="h-1 border-b border-slate-600 w-full"></div>
              </div>
            </div>
            <button className="bg-amber-600 rounded-full h-12 w-full font-bold hover:bg-amber-700 transition-all">Create account</button>
            <div className="mt-20">
              <p className="text-2xl mb-8 font-bold">Already have an account?</p>
              <button
                className="bg-transparent text-amber-600 border-2 border-slate-600 rounded-full h-12 w-full font-bold hover:bg-slate-600 transition-all"
                onClick={openModal}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomeComponent;