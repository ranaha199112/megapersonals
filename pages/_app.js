import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MegaPersonals: Classified hookups</title>
        <meta
          name="description"
          content="MegaPersonals - Post your classified ad and MEET NOW"
        />
        <meta name="keywords" content="MegaPersonals" />
      </Head>

      <ToastContainer />

      <p className="text-lg">Under construction</p>

      {/* <Component {...pageProps} /> */}
    </>
  );
}

export default MyApp;
