import type { AppProps } from "next/app";
import "tippy.js/dist/tippy.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
