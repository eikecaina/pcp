import React from "react";

import { BoxStyle, Logo } from "./styled";
import { WtcpMenu } from "./styled";
import { HeaderWtcpMenu } from "./styled";
import { InfoBoxSmall, InfoBoxMedium, InfoBoxLarge, InfoBox } from "./styled";

import { BoxLogo } from "./styled";

import { Button } from "antd";
import {
    SnippetsOutlined, FolderOpenOutlined, SaveOutlined, PrinterOutlined, CheckCircleOutlined, FlagOutlined,
    CloseCircleOutlined, CalendarOutlined, SettingOutlined, DownOutlined, InfoCircleOutlined, QuestionCircleOutlined
}
    from "@ant-design/icons";

const Wtcp: React.FC = () => {
    return (
        <BoxStyle>
            <HeaderWtcpMenu>
                <WtcpMenu>
                    <Button className="menu-wtcp" type="primary" size="small" title="Nova Cotação"><SnippetsOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Abrir Cotação"><FolderOpenOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Salvar"><SaveOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Imprimir"><PrinterOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Consumir"><CheckCircleOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Excluir"><CloseCircleOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="PCP"><CalendarOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Configurações"><SettingOutlined style={{ width: '15px' }} /><DownOutlined style={{ fontSize: '12px', width: '1px' }} /> </Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Informações"><InfoCircleOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Ajuda"><QuestionCircleOutlined /></Button>
                    <Button className="menu-wtcp" type="primary" size="small" title="Idioma"><FlagOutlined /></Button>
                </WtcpMenu>
                <Logo>
                    <BoxLogo />
                    <BoxLogo />
                    <BoxLogo />
                    <BoxLogo />
                    <img src="/assets/images/WEGLogo.png" alt="WEGLogo" style={{ padding: '10px' }} />
                </Logo>
            </HeaderWtcpMenu>
            <InfoBox>
                <InfoBoxLarge></InfoBoxLarge>
                <InfoBoxMedium></InfoBoxMedium>
                <InfoBoxMedium></InfoBoxMedium>
            </InfoBox>
        </BoxStyle>
    );
};

export default Wtcp;