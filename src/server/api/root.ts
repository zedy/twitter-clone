import { postsRouter } from "~/server/api/routers/posts";
import { createTRPCRouter } from "~/server/api/trpc";
import { profileRouter } from './routers/profile';
import { likesRouter } from './routers/likes';
import { followerRouter } from './routers/followers';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
  likes: likesRouter,
  followers: followerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
