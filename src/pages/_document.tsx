import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        <meta name="description" content="Гра Хто хоче стати мільйонером" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
