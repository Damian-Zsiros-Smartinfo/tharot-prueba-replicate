/** @format */

import { Html, Head, Main, NextScript } from "next/document";
import Providers from "@/redux/providers";
import SocketProvider from "../components/SocketProvider";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="overflow-hidden">
        <SocketProvider>
          <Main />
          <NextScript />
        </SocketProvider>
      </body>
    </Html>
  );
}
