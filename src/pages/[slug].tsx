// libs
import type { GetStaticProps, NextPage } from 'next';
import Head from "next/head";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { useRouter } from 'next/router'

// components/modules
import CenterComponent from '~/modules/layout/center.component';

// utils
import { db } from '~/server/db';
import { api } from '~/utils/api';
import { appRouter } from '~/server/api/root';
import Image from 'next/image';
import MyPosts from '~/modules/post/my-posts.component';

/**
 * @comment IT WORKS! after 3h debugging! 
 * 
 * solution: restart the server 🤦‍♂️
 * 
 */
const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const router = useRouter();
  const { data, isError, isLoading } = api.profile.getUserByUserName.useQuery({ username });

  if (isLoading) {
    console.log('this will never execute 🤞');
    return <div>Loading ...</div>
  }

  if (isError) {
    // todo => maybe redirect? hmmm 🤔
  }

  return (
    <>
      <Head>
        <title>{data?.userName} profile page</title>
      </Head>
      <CenterComponent>
        <>
          <button className="absolute top-0 right-0 z-10 p-2" onClick={() => router.back()}>Go Back</button>
          <div className="relative h-36 bg-slate-600">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">[splash placeholder]</p>
            <Image
              src={data?.imageUrl ?? ''}
              alt={'profile image'}
              width={128}
              height={128}
              className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-gray-900 bg-black"
            />
          </div>
          <div className="h-[64px]"></div>
          <div className="p-4 flex items-baseline">
            <div className="text-2xl font-bold">{`@${data?.userName ?? "unknown"
              }`}
            </div>
            <div className="text-thin ml-1">({data?.firstName} {data?.lastName})</div>
          </div>
          <div className="w-full border-b border-slate-400" />
          <MyPosts userId={data!.id} />
        </>
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