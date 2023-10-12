// libs
import type { GetStaticProps, NextPage } from 'next';
import Head from "next/head";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

// components/modules
import CenterComponent from '~/modules/layout/center.component';

// utils
import { db } from '~/server/db';
import { api } from '~/utils/api';
import { appRouter } from '~/server/api/root';

/**
 * @comment IT WORKS! after 3h debugging! 
 * 
 * solution: restart the server 🤦‍♂️
 * 
 */
const ProfilePage: NextPage<{username: string}> = ({ username }) => {
  const { data, isError, isLoading } = api.profile.getUserByUserName.useQuery({ username });

  if (isLoading) {
    // todo
    console.log('this will never execute 🤞');
    return <div>Loading ...</div>
  }

  if (isError) {
    // todo => maybe redirect? hmmm 🤔
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>{data?.userName} profile page</title>
      </Head>
      <CenterComponent>
        <p>welcome to {`${data?.userName}'s`} profile page</p>
      </CenterComponent>
    </>
  );
};

/**
 * @see https://trpc.io/docs/client/nextjs/server-side-helpers
 * 
 * The point of this is to prefetch the data of the profile match
 * so that we have it on page load and inject data into the Meta.
 * 
 * @requires https://nextjs.org/docs/messages/invalid-getstaticpaths-value
 * 
 * @param context 
 * @returns 
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db, userId: null, session: null,
    },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (!slug || typeof slug !== 'string') {
    throw new Error('slug error'); // todo: think of something better
  }

  const parsedSlug = slug.replace('@', '');

  await helpers.profile.getUserByUserName.prefetch({ username: parsedSlug });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username: parsedSlug,
    },
  };
};

/**
 * @see https://nextjs.org/docs/messages/invalid-getstaticpaths-value
 */
export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
};

export default ProfilePage;