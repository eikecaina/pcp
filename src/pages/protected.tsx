import { withAuth } from "@wmo-dev/login-utils";
import { NextPage, GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import { UnauthorizedPage } from "components/layout/UnauthorizedPage";

const Protected: NextPage = () => {
  return <div>Protected</div>;
};

export const getStaticProps: GetStaticProps = async (req) => {
  const translations = await getServerSideTranslations(req.locale);

  return {
    props: {
      ...translations,
    },
  };
};

export default withAuth({ fallback: () => <UnauthorizedPage /> })(Protected);
