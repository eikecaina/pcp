import AgGridPage from "components/layout/Wtpc/ProductConfig/AgGrid";
import RenderContent from "components/layout/Wtpc/RenderContent";
import { getServerSideTranslations } from "configs/language/server";
import { GetStaticProps } from "next";

const AgGrid: React.FC = () => (
    <AgGridPage></AgGridPage>
)
export const getStaticProps: GetStaticProps = async (req) => {
    const translations = await getServerSideTranslations(req.locale);

    return {
        props: {
            ...translations,
        },
    };
};
export default AgGrid;

