import { GetStaticProps, NextPage } from "next";

import { getServerSideTranslations } from "configs/language/server";

const NewQuotation: NextPage = () => {
  return <div>Teste</div>;
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

