import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR'

import { withAuthProvider } from "@wmo-dev/login-utils";

import { BaseLayout } from "components/layout/BaseLayout";
import { withHOCs } from "hocs/withHOCs";
import { withTheme } from "hocs/withTheme";
import { withTranslations } from "hocs/withTranslations";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ConfigProvider locale={ptBR}>
      <Head>
        <meta name="google" content="notranslate" />
        <title>{process.env.SITE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ConfigProvider>
  );
};

export default withHOCs(withTheme, withTranslations, withAuthProvider())(App);
