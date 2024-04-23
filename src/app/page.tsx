import i18nConfig from '@/../i18nConfig';
// import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { Resource, dir } from 'i18next';
import SessionProviderWrapper from '@/lib/utils/sessionProviderWrapper';
import BaseLayout from '@/components/layout/BaseLayout';
import Loader from '@/components/layout/loader/Loader';
import TranslationProviderWrapper from '@/lib/utils/translationProviderWrapper';
import initTranslations from './i18n';
import TranslationsProvider from '@/lib/utils/translationsProvider';
import { useCurrentLocale } from 'next-i18n-router/client';
import { Button, Result } from 'antd';

const inter = Inter({ subsets: ["latin"] });
const i18nNamespaces = ['layout'];

async function Layout({
    children,
    params: { locale }
  }: {
    children: ReactNode;
    params: { locale: string };
  }) {
    // const {t, resources} = await initTranslations(locale, i18nNamespaces)

    return (                            
      <Result
      status="404"
      title="404"
      subTitle="Ops, select a language on the top right corner to load content."
      // extra={<Button type="primary">Or use english</Button>}
    />
    );
}
  

export default Layout;