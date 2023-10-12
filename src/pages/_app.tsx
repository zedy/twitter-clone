// libs
import { type Session } from "next-auth"
import { ClerkProvider } from "@clerk/nextjs";;
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";

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
      </SessionProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);