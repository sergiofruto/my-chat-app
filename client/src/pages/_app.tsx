import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SocketProvider } from "@/context/SocketContext";
import { UserProvider } from "@/context/UserContext";
// import { connect } from "socket.io-client";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </UserProvider>
  );
}

export default MyApp;
