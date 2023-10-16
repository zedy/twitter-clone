// libs
import type { GetStaticProps, NextPage } from 'next';
import Head from "next/head";

// utils
import { helpers } from '~/server/ssgHelper';
import { api } from '~/utils/api';

// components/modules
import CenterComponent from '~/modules/layout/center.component';
import Post from '~/modules/post/post.component';

function trimContent(content: string) {
  if (content.length < 10) return content;

  return `${content.slice(0, 10)} ...`;
}

const SinglePostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data, isError } = api.posts.getPostById.useQuery({ postId });

  if (isError || !data || data.length < 0) {
    return <div>Error!</div>;
  }

  const { post, author } = data[0]!;

  return (
    <>
      <Head>
        <title>{`${trimContent(post?.content)} - @${author?.userName}`}</title>
      </Head>
      <CenterComponent title='Post'>
        <Post post={post} author={author} />
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
  const id = context.params?.id;

  if (!id || typeof id !== 'string') {
    throw new Error('id error'); // todo: think of something better
  }

  await helpers.posts.getPostById.prefetch({ postId: id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      postId: id,
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

export default SinglePostPage;
