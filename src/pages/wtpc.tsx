<<<<<<< HEAD
import { NextPage, GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import ContainerMainWtpc from "components/layout/Wtpc/";


const Wtpc: NextPage = () => {
  return <ContainerMainWtpc/>;
};
=======
import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import BoxContent from "components/layout/Wtpc/BoxContent";



const Wtpc: React.FC = () => (
 <BoxContent></BoxContent>
);
>>>>>>> 3d7635ca2e235f36b2045f5e9d6a8e92736e94c4

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default Wtpc;


