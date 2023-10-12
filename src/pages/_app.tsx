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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ClerkProvider {...pageProps}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);