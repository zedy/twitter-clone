import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const profileRouter = createTRPCRouter({
  getUserByUserName: publicProcedure.input(z.object({
    username: z.string(),
  }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        }
      });

      console.log(user);

      if (!user) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'No user found'
        });
      }

      return user;
    }),
});
