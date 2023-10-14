// Old: using Clark

// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({
//   publicRoutes: ["/", '/api/auth/signin', '/api/auth/signout', '/api/auth/callback/github', '/api/auth/signin/github']
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)', '/api/auth/:path*'],
// };

// New: using Next-auth

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const middleware = (request: NextRequest) => {
  console.log("middleware is running!");

  // return NextResponse.json(request)
};

export { middleware };