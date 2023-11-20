import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import BoxContent from "components/layout/Wtpc/BoxContent";



const Wtpc: React.FC = () => (
 <BoxContent></BoxContent>
);

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default Wtpc;


