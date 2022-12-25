import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" />
      </Head>
      <body style={{ height: "100vh", overflow: "auto" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
