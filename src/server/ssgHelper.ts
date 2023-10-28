// libs
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';

// utils
import { db } from '~/server/db';
import { appRouter } from '~/server/api/root';

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: {
    db, session: null,
  },
  transformer: superjson,
});