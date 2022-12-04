import { AppProps } from "next/app";
import "../sass/landing.scss";
import "../sass/styles.scss";
import "../sass/dashboard.scss";
import "../sass/modal.scss";
import "../sass/book2.scss";
import "../sass/sectionCard.scss";
import "../sass/sectionsCard.scss";
import "../sass/sectionCardBook.scss";
import "../sass/slider.scss";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
