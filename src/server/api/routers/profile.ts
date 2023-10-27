import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const profileRouter = createTRPCRouter({
  update: protectedProcedure.input(
    z.object({
      name: z.string().min(3).max(128),
      username: z.string(),
      email: z.string().email().min(8),
      title: z.string().max(64).nullable(),
      bio: z.string().min(1).max(255),
      location: z.string().max(128).nullable(),
      dob: z.date().nullable(),
    })
  ).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.update({
      data: input,
      where: {
        username: input.username,
      }
    });

    return user;
  }),

  createAccount: publicProcedure.input(
    z.object({
      username: z.string(),
      dob: z.date(),
      name: z.string(),
      email: z.string().email(),
      handleChosen: z.boolean(),
    })
  ).mutation(async ({ ctx, input }) => {
    // check if handle or email are already in DB
    const results = await ctx.db.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: input.username
            },
          },
          {
            email: {
              equals: input.email
            },
          },
        ],
      }
    });

    if (results) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Handle or email already taken',
        cause: results,
      });
    }

    const user = await ctx.db.user.create({
      data: {
        ...input
      }
    });

    return user;
  }),

  updateHandle: publicProcedure.input(
    z.object({
      username: z.string(),
      id: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.update({
      data: {
        username: input.username,
        handleChosen: true,
      },
      where: {
        id: input.id,
      }
    });

    return user;
  }),

  checkHandleAvailability: publicProcedure.input(
    z.object({
      username: z.string(), // validation in component
    })
  ).query(async ({ input, ctx }) => {
    const results = await ctx.db.user.findUnique({
      where: {
        username: input.username,
      }
    });

    return results;
  }),

  getUserByUserName: publicProcedure.input(z.object({
    username: z.string(),
  }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
        include: {
          Followers: true,
          Following: true,
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'No user found'
        });
      }

      return user;
    }),
});
