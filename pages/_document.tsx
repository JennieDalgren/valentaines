import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your love letter in seconds."
          />
          <meta property="og:site_name" content="valentaines.day" />
          <meta
            property="og:description"
            content="Generate your love letter in seconds."
          />
          <meta
            property="og:title"
            content="ValentAIne´s Day | Love Generator"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="ValentAIne´s Day | Love Generator"
          />
          <meta
            name="twitter:description"
            content="Generate your love letter in seconds."
          />
          <meta
            property="og:image"
            content="https://valentaines.day/og-image-valentaines-day.png"
          />
          <meta
            name="twitter:image"
            content="https://valentaines.day/og-image-valentaines-day.png"
          />
        </Head>
        <body className="bg-red-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
