import HeaderWtpc from "./Header";
import { ContainerContents, ContainerMainWtpc } from "./style";

const ContainerContentsWtpc: React.FC  = () =>  {
  return (
    <ContainerMainWtpc className="main-cointaner">
        <HeaderWtpc className="header-menu-wtpc"/>
        <ContainerContents className="content-box general-quotation">Dados gerais Cotação</ContainerContents>
        <ContainerContents className="content-box item-config">Configuração de item</ContainerContents>
        <ContainerContents className="content-box delivery-prep">Entregas (Data Prep)</ContainerContents>
        <ContainerContents className="content-box product-config">Configuração de Produto</ContainerContents>
        <ContainerContents className="content-box quotation">Cotação / Resumido / Detalhado</ContainerContents>
        <ContainerContents className="content-box critic-material">Materiais críticos</ContainerContents>
    </ContainerMainWtpc>
  )
}

export default ContainerContentsWtpc;
