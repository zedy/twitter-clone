import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';

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

      return result;
    }),
});
