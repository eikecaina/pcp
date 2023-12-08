import { GetStaticProps } from "next";

import { getServerSideTranslations } from "configs/language/server";
import PcpPage from "components/layout/Wtpc/Pcp/PcpPage";


const Pcp: React.FC = () => (
    <PcpPage />
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
