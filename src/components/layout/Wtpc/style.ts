import styled from "@emotion/styled";

export const ContainerMainWtpc = styled.div`
    width: 100%;
    height: 100%;

    gap: 10px;
    display: grid;
    grid-template-rows: 35px 200px 310px 200px;
    grid-template-columns: 540px 540px 550px;
    grid-template-areas: 
    'header header header'
    'general-quotation item-config delivery-prep'
    'product-config quotation quotation'
    'product-config critic-material critic-material';
    text-align: center;
   

    .header-menu-wtpc {
        grid-area: header;
    }
    .general-quotation {
        grid-area: general-quotation;
    }
    .item-config {
        grid-area: item-config;
    }
    .delivery-prep {
        grid-area: delivery-prep;
    }
    .product-config {
        grid-area: product-config;
    }
    .quotation {
        grid-area: quotation;
        display: flex;
        justify-content: center;
    }
    .critic-material {
        grid-area: critic-material;
        display: flex;
        justify-content: center;
    }
  
`;

export const ContainerContents = styled(ContainerMainWtpc)`
    border: 1px solid black;
`;