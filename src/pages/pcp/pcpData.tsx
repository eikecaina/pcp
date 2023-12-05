import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import PcpData from "components/layout/Wtpc/Pcp/PcpData";

const Pcp: React.FC = () => (
    <PcpData />
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
