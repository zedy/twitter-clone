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
    return <WelcomeComponent providers={providers} />;
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