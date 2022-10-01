import { css } from "@emotion/react";
import Header from "../src/components/header";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/context/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
