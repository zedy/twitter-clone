import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserFields = (user: User) => {
  return {
    id: user.id,
    imageUrl: user.imageUrl,
    userName: user.username,
  }
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    // until we setup the ORM and Authors Table and relations
    // we'll do this: get data from the Clark Client from the Server
    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    })).map(filterUserFields);

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    }));
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
