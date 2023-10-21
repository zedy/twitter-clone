// components/modules
import { useSession } from 'next-auth/react';
import CenterComponent from '~/modules/layout/center.component';
import HeaderComponent from '~/modules/layout/header.component';
import PostsView from '~/modules/post/posts-view.component';
import HandleChange from '~/modules/signup/handleChange.component';
import { LoadingPage } from '~/modules/spinner/loading.component';

export default function Home() {
  const { status, data } = useSession();

  if (data === undefined) {
    return <LoadingPage />
  }

  return (
    <>
      {data?.user.handleChosen ? (
        <CenterComponent title='Home'>
          <HeaderComponent />
          <PostsView />
        </CenterComponent>
      ) : <HandleChange />}
    </>
  );
};
