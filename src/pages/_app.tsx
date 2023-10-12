// libs
import { type Session } from "next-auth"
import { ClerkProvider } from "@clerk/nextjs";;
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

// utils
import { api } from "~/utils/api";

// styles
import "~/styles/globals.css";

// modules
import HeadComponent from '~/modules/layout/head.component';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ClerkProvider {...pageProps}>
      <SessionProvider session={session}>
        {/* default Head, if overwrite needed, extend to any page */}
        <HeadComponent />
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);