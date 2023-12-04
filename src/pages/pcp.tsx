import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import OpenPcp from "components/layout/Wtpc/Pcp/OpenPcp";

const Pcp: React.FC = () => (
    <OpenPcp />
);

export const getStaticProps: GetStaticProps = async (req) => {
    const translations = await getServerSideTranslations(req.locale);

    return {
        props: {
            ...translations,
        },
    };
};

export default Pcp;
