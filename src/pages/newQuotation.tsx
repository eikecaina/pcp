import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import ItensConfig from "components/layout/Wtpc/ProductConfig/ItensConfig";



const NewQuotation: React.FC = () => (
  <ItensConfig></ItensConfig>
);

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default NewQuotation;


