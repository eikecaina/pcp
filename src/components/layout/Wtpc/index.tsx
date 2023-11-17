import HeaderWtpc from "./Header";
import { ContainerContents, ContainerMainWtpc } from "./style";

const ContainerContentsWtpc: React.FC = () => {
    return (
        <ContainerMainWtpc className="main-cointaner">
            <HeaderWtpc className="header-menu-wtpc" />
            <ContainerContents className="content-box general-quotation">
                <span>Dados gerais Cotação</span>
            </ContainerContents>
            <ContainerContents className="content-box item-config">
                <span>Configuração de item</span>
            </ContainerContents>
            <ContainerContents className="content-box delivery-prep">
                <span>Entregas (Data Prep)</span>
            </ContainerContents>
            <ContainerContents className="content-box product-config">
                <span>Configuração de Produto</span>
            </ContainerContents>
            <ContainerContents className="content-box quotation">
                <span>Cotação / Resumido / Detalhado</span>
            </ContainerContents>
            <ContainerContents className="content-box critic-material">
                <span>Materiais críticos</span>
            </ContainerContents>
        </ContainerMainWtpc>
    )
}

export default ContainerContentsWtpc;
