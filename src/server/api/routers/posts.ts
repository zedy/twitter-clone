import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

// custom fn for returning specific user fields instead of the entire user obj
const filterUserFields = (user: User) => {
  return {
    id: user.id,
    imageUrl: user.imageUrl,
    userName: user.username,
  }
};

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */ 
  prefix: "@upstash/ratelimit",
});


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
      const { success } = await ratelimit.limit(ctx.userId);
 
      if (!success) {
        throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'rate limit reached'});
      }

      const post = await ctx.db.post.create({
        data: {
          authorId: ctx.userId ?? '',
          content: input.content,
        }
      });

      return post;
    }),
});
