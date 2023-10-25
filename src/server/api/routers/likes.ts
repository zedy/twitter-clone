import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const likesRouter = createTRPCRouter({
  handleLike: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        likeId: z.string(),
      })
    ).mutation(async ({ ctx, input }) => {
      // remove like
      let result;
console.log(input);
      if (input.likeId) {
        result = await ctx.db.like.delete({
          where: {
            id: input.likeId,
          }
        });
      } else {
        // add like
        result = await ctx.db.like.create({
          data: {
            userId: ctx.session.user.id ?? '',
            postId: input.postId,
          }
        });
      }

      // if (!success) {
      //   throw new TRPCError({
      //     code: 'TOO_MANY_REQUESTS',
      //     message: 'Hey! No spamming!'
      //   });
      // }

      return result;
    }),
});
