// libs
import type { GetStaticProps, NextPage } from 'next';
import Head from "next/head";

// utils
import { helpers } from '~/server/ssgHelper';
import { api } from '~/utils/api';

// components/modules
import CenterComponent from '~/modules/layout/center.component';
import { LoadingPage } from '~/modules/spinner/loading.component';
import PostPageComponent from '~/modules/post/postPage.component';
import Post from '~/modules/post/post.component';

function trimContent(content: string) {
  if (content.length < 10) return content;

  return `${content.slice(0, 10)} ...`;
}

const SinglePostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data, isError, isLoading } = api.posts.getPostById.useQuery({ postId });

  if (isError || !data) {
    return <div>Error!</div>;
  }

  if (isLoading) {
    return <LoadingPage />
  }

  const { User } = data;
  console.log(data);
  return (
    <>
      <Head>
        <title>{`@${User?.username} - ${trimContent(data.content)}`}</title>
      </Head>
      <CenterComponent title='Post'>
        <PostPageComponent post={data} />
        <div className="flex flex-col">
          {data.replies.length > 0 ? data.replies.map((post) => <Post key={post.id} post={post} />) : <div>123</div>}
        </div>
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
