import React from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import PcpData from './PcpData';
import PcpProcessResources from './PcpProcessResources';


const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Data',
        children: <PcpData />,
    },
    {
        key: '2',
        label: 'Processos e Recursos',
        children: <PcpProcessResources />,
    },
    {
        key: '3',
        label: 'Relatórios',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: 'Recursos Consolidados',
        children: 'Content of Tab Pane 4',
    }
];

const PcpPage: React.FC = () => {
    return (
        <Tabs tabBarStyle={{ margin: 0 }} defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

export default PcpPage
