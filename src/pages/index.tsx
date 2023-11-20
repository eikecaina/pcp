import { NextPage, GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";

const Home: NextPage = () => {
  return <div>Home</div>;
};

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default Home;
