// libs
import type { GetStaticProps, NextPage } from 'next';
import { useState, type FC, useEffect, memo, useContext } from 'react';
import Link from 'next/link';
import Head from "next/head";
import Image from 'next/image';
import dayjs from 'dayjs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { find } from 'lodash';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

// components/modules
import CenterComponent from '~/modules/layout/center.component';
import { Modal, useModal } from '~/hooks/useModal';
import MyPosts from '~/modules/post/my-posts.component';
import EditProfileForm from '~/modules/forms/edit-profile.form';
import { ModalContext, ModalContextProvider } from '~/modules/context/modalContext';
import { LoadingPage } from '~/modules/spinner/loading.component';

// utils
import { api } from '~/utils/api';
import { helpers } from '~/server/ssgHelper';
import { Calendar, Location, ArrowLeft, VerifiedBadgeOutline } from '~/utils/svgs';
import { COLOR_PRIMARY, GENERIC_ERROR, LOGIN_FOLLOW } from '~/utils/conts';
import useDebounceFn from '~/hooks/useDebounceFn';

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { openModal, modalProps, closeModal } = useModal();
  const { status, data: loggedInUser } = useSession();
  const isAuthed = status === 'authenticated';
  const isOwnProfile = isAuthed && loggedInUser?.user.username === username;
  const { data, isLoading, refetch } = api.profile.getUserByUserName.useQuery({ username });
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  /**
   * We need to check if the person vieing the persons profile is a follower
   * 
   * @returns Record<string, string> | null
   */
  const isUserFollowing = () => {
    return find(data?.Followers, { followerId: loggedInUser?.user.id });
  };

  useEffect(() => {
    if (status !== 'loading' && loggedInUser?.user.username !== username) {
      setIsFollowing(isUserFollowing() ? true : false);
    }
  }, [loggedInUser])

  const { mutate } = api.followers.follow.useMutation({
    onSuccess: (response) => {
      if (response === null) {
        closeModal();
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(GENERIC_ERROR);
    },
  });

  const debouceMutation = useDebounceFn(mutate, 650);

  /*
   * We have to wait for user to be loaded from next-auth in order
   * to alleviate the popin of micro components that rely on that hook
   */
  if (isLoading || status === 'loading') {
    return <LoadingPage />;
  }

  /**
   * Send reqest to server or show error
   */
  const handleFollowStatus = () => {
    if (isAuthed) {
      debouceMutation(isUserFollowing() ?? {
        followerId: loggedInUser?.user?.id ?? '',
        followingId: data?.id ?? '',
        id: undefined,
      });

      setIsFollowing((state) => !state);
    } else {
      toast.error(LOGIN_FOLLOW);
    }
  };

  /**
   * Show the persons username in the top header above all content
   * 
   * @returns JSX
   */
  const TopHeader = () => {
    const ProfileName = () => (
      <b className="text-xl ml-5">
        {`${data?.name}'s profile page`}
      </b>
    );

    return (
      <>
        {isOwnProfile ? (
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

  const ProfileTabs = memo(function ProfileTabs() {
    return (
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
          <p>TODO</p>
        </TabPanel>
        <TabPanel>
          <p>TODO</p>
        </TabPanel>
        <TabPanel>
          <p>TODO</p>
        </TabPanel>
      </Tabs >
    )
  });

  /**
   * This will be the button on the right side of the users profile
   * 
   * It will either display "edit profile" if the logged in user matched the profile
   * Else it will display the Follow/Unfollow button.
   * 
   * @param text string the content of the button 
   * @param callback this takes a FN and executes it when on click is called
   * @returns JSX
   */
  const EditProfileButton = memo(function EditProfileButton() {
    return <button
      onClick={openModal}
      className='border border-amber-600 px-4 rounded-3xl h-9 text-amber-600 hover:bg-amber-800'>
      Edit Profile
    </button>
  });

  const FollowButton = memo(function FollowButton() {
    return <button
      onClick={handleFollowStatus}
      className='border border-amber-600 px-4 rounded-3xl h-9 text-amber-600 hover:bg-slate-800'>
      Follow
    </button>
  });

  const UnfollowButton = memo(function UnfollowButton() {
    const [text, setText] = useState<string>('Following');

    return <button
      onClick={openModal}
      onMouseEnter={() => setText('Unfollow')}
      onMouseLeave={() => setText('Following')}
      className='border w-28 border-amber-600 px-4 rounded-3xl h-9 text-amber-600 hover:border-red-700 hover:text-red-700'>
      {text}
    </button>
  });

  const ProfileActionButtonWrapper = () => {
    if (isOwnProfile) {
      return <EditProfileButton />;
    } else if (isFollowing) {
      return <UnfollowButton />;
    } else if (!isFollowing) {
      return <FollowButton />;
    } else {
      return <div></div>
    }
  };

  /**
   * Small local component. Just a confirmation box.
   * 
   * TODO: move to a separate component for usability?
   * 
   * @returns JSX
   */
  const ConfirmUnfollow = () => {
    const { setIsLoading } = useContext(ModalContext);

    return (
      <div>
        <p>
          Their posts will no longer show up in your For You timeline.
          You can still view their profile, unless their posts are protected.
        </p>
        <div className='mt-5 flex justify-between'>
          <button onClick={() => {
            setIsLoading(true);
            handleFollowStatus();
          }}
            className="bg-amber-600 w-52 py-2 rounded-full hover:bg-amber-700 transition-all">
            <b>Unfollow</b>
          </button>
          <button onClick={closeModal} className="bg-transparent w-52 py-2 rounded-full hover:bg-slate-800 transition-all">
            Cancel
          </button>
        </div>
      </div>
    )
  };

  /**
   * Fn for refetching the { data }
   * 
   * @see https://trpc.io/docs/client/react/useQuery
   */
  const refetchApi = async () => {
    await refetch();
  };

  return (
    <ModalContextProvider>
      <Head>
        <title>{data?.username}&apos;s profile page</title>
      </Head>
      <Modal
        {...modalProps}
        title={isOwnProfile ? 'Edit Profile' : `Unfollow ${data?.name}?`}
      >
        {isOwnProfile ? <EditProfileForm userData={data} callback={refetchApi} closeModal={closeModal} /> : <ConfirmUnfollow />}
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
          <ProfileActionButtonWrapper />
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
          <div className='flex mb-2'>
            <div>
              <span className='mr-1'>{data?.Following.length}</span>
              <span className='text-slate-400'>Following</span>
            </div>
            <div className='ml-3'>
              <span className='mr-1'>{data?.Followers.length}</span>
              <span className='text-slate-400'>Followers</span>
            </div>
          </div>
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