// libs
import type { FC } from 'react';
import { useSession } from 'next-auth/react';
import { getProviders } from 'next-auth/react';
import type { GetServerSideProps } from 'next';

// components/modules
import HandleChange from '~/modules/auth/handleChange.component';
import { LoadingPage } from '~/modules/spinner/loading.component';
import WelcomeComponent from '~/modules/welcome/welcome.component';
import HomePage from '~/modules/homepage/homepage.component';
import { ModalContextProvider } from '~/modules/context/modalContext';
import { SignupContextProvider } from '~/modules/context/signupContext';

export interface HomeProps {
  providers: [
    {
      name: string,
      id: string
    }
  ]
}

const Home: FC<HomeProps> = ({ providers }) => {
  const { data } = useSession();

  if (data === undefined) {
    return <LoadingPage />;
  }

  if (!data) {
    return (
      <ModalContextProvider>
        <SignupContextProvider>
          <WelcomeComponent providers={providers} />
        </SignupContextProvider>
      </ModalContextProvider>
    );
  }

  return data?.user?.handleChosen ? <HomePage /> : <HandleChange />
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}