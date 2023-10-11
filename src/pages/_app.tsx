// libs
import { type Session } from "next-auth"
import { ClerkProvider } from "@clerk/nextjs";;
import { type AppType } from "next/app";

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
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
