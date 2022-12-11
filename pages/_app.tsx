import { AppProps } from "next/app";
import "../sass/landing.scss";
import "../sass/styles.scss";
import "../sass/dashboard.scss";
import "../sass/modal.scss";
import "../sass/book2.scss";
import "../sass/sectionCard.scss";
import "../sass/sectionsCard.scss";
import "../sass/sectionCardBook.scss";
import "../sass/searchBooks.scss";
import "../sass/slider.scss";
import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
