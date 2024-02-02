import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tharot',
  description: 'Tharot',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
