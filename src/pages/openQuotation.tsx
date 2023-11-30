import SearchQuotation from "components/layout/Wtpc/OpenQuotation/SearchQuotation";
import { getServerSideTranslations } from "configs/language/server";
import { GetStaticProps } from "next";

const OpenQuotation: React.FC = () => {
    return (
        <SearchQuotation/>
    );
}
export const getStaticProps: GetStaticProps = async (req) => {
    const translations = await getServerSideTranslations(req.locale);

    return {
        props: {
            ...translations,
        },
    };
};
export default OpenQuotation