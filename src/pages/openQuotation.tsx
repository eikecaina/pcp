import { getServerSideTranslations } from "configs/language/server";
import { GetStaticProps } from "next";

const OpenQuotation: React.FC = () => {
    return (
        <div>Teste</div>
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