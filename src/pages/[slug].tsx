// libs
import type { GetStaticProps, NextPage } from 'next';
import type { FC } from 'react';
import Link from 'next/link';
import Head from "next/head";
import Image from 'next/image';
import dayjs from 'dayjs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// components/modules
import CenterComponent from '~/modules/layout/center.component';
import { Modal, useModal } from '~/hooks/useModal';
import MyPosts from '~/modules/post/my-posts.component';
import EditProfileForm from '~/modules/forms/edit-profile.form';
import { ModalContextProvider } from '~/modules/context/modalContext';

// utils
import { api } from '~/utils/api';
import { helpers } from '~/server/ssgHelper';
import { Calendar, Location, ArrowLeft, VerifiedBadgeOutline } from '~/utils/svgs';
import { COLOR_PRIMARY } from '~/utils/conts';
import { useSession } from 'next-auth/react';

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { openModal, modalProps, closeModal } = useModal();
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const { data, isError, isLoading, refetch } = api.profile.getUserByUserName.useQuery({ username });

  if (isLoading) {
    console.log('this will never execute 🤞');
    return <div>Loading ...</div>
  }

  if (isError) {
    // todo => maybe redirect? hmmm 🤔
  }

  const TopHeader = () => {
    const ProfileName = () => <b className="text-xl ml-5">
      {`${data?.name}'s profile page`}
    </b>

    return (
      <>
        {isLoggedIn ? (
          <Link className='flex items-center' href={'/'}>
            {ArrowLeft(28, 28, COLOR_PRIMARY)}
            <ProfileName />
          </Link>
        ) : (
          <div className='flex items-center'>
            <ProfileName />
          </div>
        )}
      </>
    )
  };

  const ProfileTabs = () => (
    <Tabs>
      <TabList className='flex justify-evenly'>
        <Tab selectedClassName='tab-element-selected' className='tab-element'>Tweets</Tab>
        <Tab selectedClassName='tab-element-selected' className='tab-element'>Replies</Tab>
        <Tab selectedClassName='tab-element-selected' className='tab-element'>Media</Tab>
        <Tab selectedClassName='tab-element-selected' className='tab-element'>Links</Tab>
      </TabList>

      <TabPanel>
        <MyPosts userId={data!.id} />
      </TabPanel>
      <TabPanel>
        <p>no idea what goes here, i don't have twitter</p>
      </TabPanel>
      <TabPanel>
        <p>no idea what goes here, i don't have twitter</p>
      </TabPanel>
      <TabPanel>
        <p>no idea what goes here, i don't have twitter</p>
      </TabPanel>
    </Tabs>
  );

  const ProfileActionButton: FC<{ name: string; callback: () => void }> = ({ callback, name }) => (
    <button
      onClick={callback}
      className='border border-amber-600 text-amber-600 px-6 h-12 rounded-3xl hover:bg-amber-600 hover:text-slate-900'>
      {name}
    </button>
  );

  const refetchApi = async () => {
    await refetch();
  }

  return (
    <ModalContextProvider>
      <Head>
        <title>{data?.username} profile page</title>
      </Head>
      <Modal
        {...modalProps}
        title='Edit Profile'
      >
        <EditProfileForm userData={data} callback={refetchApi} closeModal={closeModal} />
      </Modal>
      <CenterComponent title={<TopHeader />}>
        <div className="relative bg-slate-600 h-48">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">[splash placeholder]</p>
          <Image
            src={data?.image ?? ''}
            alt={'profile image'}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-gray-900 bg-black"
          />
        </div>
        <div className="h-[64px] flex justify-end pr-4 pt-4">
          {isLoggedIn ?
            <ProfileActionButton callback={openModal} name={'Edit profile'} /> :
            <ProfileActionButton callback={() => console.log('a')} name={'Follow'} />
          }
        </div>
        <div className="p-3 flex items-baseline flex-col">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{`${data?.name ?? "unknown"}`}</span>
            <span className="ml-1">
              {VerifiedBadgeOutline(22, 22, COLOR_PRIMARY)}
            </span>
            {data?.title ? <span className="ml-1 text-thin text-md text-slate-600">({data.title})</span> : null}
          </div>
          <div className='mb-3'>
            <span className="text-thin text-amber-600">
              @
            </span>
            <span className="text-thin text-slate-400">
              {data?.username}
            </span>
          </div>
          {data?.bio ? (
            <p className='text-slate-400 mb-2'>
              {data.bio}
            </p>
          ) : null}
          <div className='flex mb-2'>
            {Calendar(20, 20, COLOR_PRIMARY)}
            <span className='text-slate-400 ml-2'>
              Joined on {dayjs(data?.joined).format('MMM YYYY')}
            </span>
          </div>
          {data?.location ? (
            <div className='flex mb-2'>
              {Location(22, 22, COLOR_PRIMARY)}
              <div className="text-slate-400 ml-2">
                {data.location}
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-full border-b border-slate-400" />
        <ProfileTabs />
      </CenterComponent>
    </ModalContextProvider>
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