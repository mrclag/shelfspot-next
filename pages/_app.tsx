import { AppProps } from "next/app";
import "../sass/landing.scss";
import "../sass/styles.scss";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
