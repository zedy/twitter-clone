import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';

// custom fn for returning specific user fields instead of the entire user obj
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
      orderBy: {
        createdAt: 'desc'
      }
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

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(255),
      })
    ).mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          authorId: ctx.userId ?? '',
          content: input.content,
        }
      });

      return post;
    }),
});
