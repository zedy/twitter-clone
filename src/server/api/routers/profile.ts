import { clerkClient } from '@clerk/nextjs';
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import type { User } from '@clerk/nextjs/dist/types/server';

// custom fn for returning specific user fields instead of the entire user obj
const filterUserFields = (user: User) => {
  return {
    id: user.id,
    imageUrl: user.imageUrl,
    userName: user.username,
    gender: user.gender,
    firstName: user.firstName,
    lastName: user.lastName,
    hasImage: user.hasImage,
  }
};

export const profileRouter = createTRPCRouter({
  getUserByUserName: publicProcedure.input(z.object({
    username: z.string(),
  }))
    .query(async ({ input }) => {
      const user = (await clerkClient.users.getUserList({
        username: [input.username],
      })).map(filterUserFields);

      if (!user || user.length < 0) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'No user found'
        });
      }

      return user[0];
    }),
});
