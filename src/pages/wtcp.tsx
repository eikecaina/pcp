import { NextPage, GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import BoxStyle from "components/layout/Wtcp/Header/Menu";

const Wtcp: NextPage = () => {
  return <BoxStyle/>;
};

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default Wtcp;


