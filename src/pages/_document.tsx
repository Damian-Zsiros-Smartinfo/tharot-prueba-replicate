import { Html, Head, Main, NextScript } from "next/document";
import Providers from "@/redux/providers";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Tharot</title>
      </Head>
      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
