/** @format */

import { Html, Head, Main, NextScript } from "next/document";
import Providers from "@/redux/providers";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
