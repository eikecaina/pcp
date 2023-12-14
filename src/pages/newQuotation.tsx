import { GetStaticProps, NextPage } from "next";

import { getServerSideTranslations } from "configs/language/server";
import Quotation from "components/NewQuotation/Quotation";

const NewQuotation: NextPage = () => {
  return <Quotation />;
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


