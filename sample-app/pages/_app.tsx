import { css } from "@emotion/react";
//import Header from "../lib/header"
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
