# Twitter Clone

This app is intended to be used as a coding challenge and knowledge sharing (within my company). 
The goal is to create a working replica of twitter (the posting part, we don't care about the rest)
and then use the codebase as a jumping off point for less experiences devs to aclimate to using different
types of services and to learn how to build real world prod ready applications.

## Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
It contains and is built using the following technologies and libraries:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Planetscale](https://planetscale.com/)
- [Vercel](https://vercel.com/)
- [Clerk](https://clerk.com/)
- [dayJS](https://day.js.org/)
- [Zod](https://zod.dev/)
- [Upstash](https://upstash.com/)
- [React Hook Form + Yup]()

# Todo list 
(not listed by priority):

- add an image hosting service so we can upload profile images/splash screens
- re-tweet models
- responsive
- create vars in tailwind for main/secondary/action colors
- update the middleware (right now it doesn't do anything)
- add notifications? 🤔 [maybe not]
- add the ability to post pictures/media/urls
- finish Sign In via email/pass [add pass to account]
- fix all TS errors 
- create new github/google oath apps for Vercel and add their ENVs
- implement character counter for Tweets/Replies
- refetchOnWindowFocus: disable for some queries?