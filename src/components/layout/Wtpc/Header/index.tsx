import React from "react";

import { Logo } from "./styled";
import { WtpcMenu } from "./styled";

import { BoxLogo } from "./styled";

import { Button } from "antd";
import {
    SnippetsOutlined, FolderOpenOutlined, SaveOutlined, PrinterOutlined, CheckCircleOutlined, FlagOutlined,
    CloseCircleOutlined, CalendarOutlined, SettingOutlined, DownOutlined, InfoCircleOutlined, QuestionCircleOutlined
}
    from "@ant-design/icons";

interface Prop {
    className: string;
}

const HeaderWtpc: React.FC<Prop> = ({ className }) => {
    const boxesLogo = Array.from({ length: 4 }, (_, i) => (
        <BoxLogo key={i} />
    ));
    const menuButtonsInfo = [
        { id: 0, title: 'Nova Cotação', icon: <SnippetsOutlined /> },
        { id: 1, title: 'Abrir Cotação', icon: <FolderOpenOutlined /> },
        { id: 2, title: 'Salvar', icon: <SaveOutlined /> },
        { id: 3, title: 'Imprimir', icon: <PrinterOutlined /> },
        { id: 4, title: 'Consumir', icon: <CheckCircleOutlined /> },
        { id: 5, title: 'Excluir', icon: <CloseCircleOutlined /> },
        { id: 6, title: 'PCP', icon: <CalendarOutlined /> },
        { id: 7, title: 'Configurações', icon: <SettingOutlined /> },
        { id: 8, title: 'Informações', icon: <InfoCircleOutlined /> },
        { id: 9, title: 'Ajuda', icon: <QuestionCircleOutlined /> },
        { id: 10, title: 'Idioma', icon: <FlagOutlined /> },

    ];

    const menuButtons = menuButtonsInfo.map((button, i) => (
        <Button className="menu-wtpc" type="primary" size="small" key={i} title={button.title}>
            {button.icon}
        </Button>
    ));

    return (
        <>
            <WtpcMenu className={className}>
                <>{menuButtons}</>
                <Logo>
                    <>{boxesLogo}</>
                    <img src="/assets/images/WEGLogo.png" alt="WEGLogo" style={{ padding: '10px' }} />
                </Logo>
            </WtpcMenu>

        </>
    );
};

export default HeaderWtpc;