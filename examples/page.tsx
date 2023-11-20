// import { withAuth } from "@wmo-dev/login-utils"; // com autenticação
import { NextPage, GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
// import { UnauthorizedPage } from "components/layout/UnauthorizedPage"; // com autenticação

const Page: NextPage = () => {
  return <div>Page</div>;
};

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(
    req.locale
    //, ["page"]: lista de arquivos de tradução para carregar inicialmente
  );

  return {
    props: {
      ...translations,
    },
  };
};

export default Page; // sem autenticação
// export default withAuth({ fallback: () => <UnauthorizedPage />, roles: ["admin"] })(Protected); // com autenticação
