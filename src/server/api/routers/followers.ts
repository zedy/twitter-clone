import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';

export const followerRouter = createTRPCRouter({
  follow: protectedProcedure
    .input(
      z.object({
        followerId: z.string(),
        followingId: z.string(),
        id: z.string().nullish(), // if unfollow we'll have the ID of the table row
      })
    ).mutation(async ({ ctx, input }) => {
      if (!input.id) {
        const result = await ctx.db.followers.create({
          data: {
            followerId: input.followerId,
            followingId: input.followingId,
          }
        });

        return result;
      } else {
        await ctx.db.followers.delete({
          where: {
            id: input.id,
          }
        });

        return null;
      }
    }),
});
