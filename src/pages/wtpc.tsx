import { NextPage, GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import ContainerMainWtpc from "components/layout/Wtpc/";


const Wtpc: NextPage = () => {
  return <ContainerMainWtpc/>;
};

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default Wtpc;


