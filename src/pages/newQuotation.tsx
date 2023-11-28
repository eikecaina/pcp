import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import RenderContent from "components/layout/Wtpc/RenderContent";



const NewQuotation: React.FC = () => (
 <RenderContent></RenderContent>
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


