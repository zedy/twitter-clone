// libs
import Head from "next/head";

// components/modules
import CenterComponent from '~/modules/layout/center.component';
import HeaderComponent from '~/modules/layout/header.component';
import PostsView from '~/modules/post/posts-view.component';

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenterComponent>
        <>        
          <HeaderComponent />
          <PostsView />
        </>
      </CenterComponent>
    </>
  );
};
