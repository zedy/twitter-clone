import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

// Create a new ratelimiter, that allows 2 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});


export const postsRouter = createTRPCRouter({
  getPostById: publicProcedure.input(
    z.object({
      postId: z.string(),
    })
  ).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findFirst({
      where: {
        id: input.postId
      },
      include: {
        User: true,
      }
    });

    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No post found matching id',
      });
    }

    return post;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        User: true,
      }
    });

    return posts;
  }),

  getPostByUserId: publicProcedure.input(z.object({
    userId: z.string(),
  })).query(async ({ ctx, input }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        userId: input.userId
      },
      include: {
        User: true,
      }
    });

    return posts;
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(255),
      })
    ).mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id ?? 'anon');

      if (!success) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Hey! No spamming!'
        });
      }

      const post = await ctx.db.post.create({
        data: {
          userId: ctx.session.user.id ?? '',
          content: input.content,
        }
      });

      return post;
    }),
});
