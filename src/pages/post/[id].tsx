// libs
import Head from "next/head";

// components/modules
import CenterComponent from '~/modules/layout/center.component';

export default function SinglePostPage() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenterComponent>
        <p>Todo: Single Post Page</p>
      </CenterComponent>
    </>
  );
};
