import { GlobalStyles } from "components/styles/GlobalStyles";
import Head from "next/head";
// components
import Page from "../components/Page";
// Global Styles
import "antd/dist/antd.css";
import "assets/styles.less";
// Redux
import store from "redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Dashbord - laksers sports</title>
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Provider>
  );
}

export default MyApp;
