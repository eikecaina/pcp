import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Result } from 'antd';

const inter = Inter({ subsets: ["latin"] });
const i18nNamespaces = ['layout'];

async function Layout({
    children,
    params: { locale }
  }: {
    children: ReactNode;
    params: { locale: string };
  }) {

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