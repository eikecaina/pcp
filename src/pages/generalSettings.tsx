import { GetStaticProps, NextPage } from "next";

import { getServerSideTranslations } from "configs/language/server";
import GeneralSettings from "components/Settings/GeneralSettings";

const NewQuotation: NextPage = () => {
  return <GeneralSettings/>;
};


export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);
  
  return {
    props: {
      ...translations,
    },
  };
};

export default NewQuotation;

