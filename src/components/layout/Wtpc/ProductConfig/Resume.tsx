import { Button, Card, List, Row, Tabs, TabsProps, Typography } from "antd";
import { useEffect, useState } from "react";

const axios = require('axios');

const Resume: React.FC = () => {
    const [cotacaoData, setcotacaoData] = useState<any[]>([]);
    const [resumidoData, setResumidoData] = useState<any[]>([]);
    const [detalhadoData, setDetalhadoData] = useState<any[]>([]);

    async function axiosData() {
        try {
            const response = await axios.get('http://localhost:8080/');

            const cotacao = response.data.registros.find(item => item.tipo === 'cotacao')?.dados || [];
            const resumido = response.data.registros.find(item => item.tipo === 'resumido')?.dados || [];
            const detalhado = response.data.registros.find(item => item.tipo === 'detalhado')?.dados || [];

            setcotacaoData(cotacao);
            setResumidoData(resumido);
            setDetalhadoData(detalhado);

        } catch (error) {
            console.error('Erro ao acessar a API:', error.message);
        }
    }

    useEffect(() => {
        axiosData();
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Cotação',
            children: <List
                style={{ height: '100%', overflowY: 'auto', maxHeight: '100%', width: '100%' }}
                size="small"
                dataSource={cotacaoData}
                renderItem={(item, index) => (
                    <List.Item style={{ background: index % 2 === 0 ? 'white' : '#f0f0f0', }}>
                        <Typography.Text mark>[DATA]</Typography.Text> {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${item.processo} (${item.duracao || 'Sem duração'})`}
                    </List.Item>
                )}
            />
        },
        {
            key: '2',
            label: 'Resumo',
            children: <List
                style={{ height: '100%', overflowY: 'auto', maxHeight: '100%', width: '100%' }}
                size="small"
                dataSource={resumidoData}
                renderItem={(item, index) => (
                    <List.Item style={{ background: index % 2 === 0 ? 'white' : '#f0f0f0', }}>
                        <Typography.Text mark>[DATA]</Typography.Text> {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${item.processo} (${item.duracao || 'Sem duração'})`}
                    </List.Item>
                )}
            />,
        },
        {
            key: '3',
            label: 'Detalhado',
            children: <List
                style={{ height: '100%', overflowY: 'auto', maxHeight: '100%', width: '100%' }}
                size="small"
                dataSource={detalhadoData}
                renderItem={(item, index) => (
                    <List.Item style={{ background: index % 2 === 0 ? 'white' : '#f0f0f0', }}>
                        <Typography.Text mark>[DATA]</Typography.Text> {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${item.processo} (${item.duracao || 'Sem duração'})`}
                    </List.Item>
                )}
            />,
        },
    ];

    return (
        <Card bodyStyle={{ padding: 0, height: '100%', minHeight: 774 }}>
            <Tabs tabBarStyle={{ padding: '0 0 0 15px' }} tabBarGutter={20} type="line" style={{ height: '100%', width: '100%', overflowY: 'auto', margin: 0 }} defaultActiveKey="1" items={items} />
        </Card>
    );
}

export default Resume;