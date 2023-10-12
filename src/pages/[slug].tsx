// libs
import Head from "next/head";

// components/modules
import CenterComponent from '~/modules/layout/center.component';

// utils
import { api } from '~/utils/api';

export default function ProfilePage() {
  const { data, isError, isLoading } = api.profile.getUserByUserName.useQuery({ username: 'zedy' });

  if (isLoading) {
    // todo
    return <div>Loading ...</div>
  }

  if (isError) {
    // todo => maybe redirect? hmmm 🤔
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <CenterComponent>
        <p>welcome to {`${data?.userName}'s`} profile page</p>
      </CenterComponent>
    </>
  );
};
