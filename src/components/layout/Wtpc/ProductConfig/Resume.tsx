import { Button, List, Row, Typography } from "antd";
import { useEffect, useState } from "react";

const axios = require('axios');

const Resume: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
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

            setData(cotacao);
        } catch (error) {
            console.error('Erro ao acessar a API:', error.message);
        }
    }

    useEffect(() => {
        axiosData();
    }, []);

    const handleResumoClick = () => {
        setData(cotacaoData);
    };

    const handleResumidoClick = () => {
        setData(resumidoData);
    };

    const handleDetalhadoClick = () => {
        setData(detalhadoData);
    };

    return (
        <List
            style={{ height: '100%', overflowY: 'auto', maxHeight: '100%', width: '100%' }}
            size="small"
            header={
                <Row>
                    <Button onClick={handleResumoClick}>Cotação</Button>
                    <Button onClick={handleResumidoClick} style={{ margin: '0 10px 0 10px' }}>Resumido</Button>
                    <Button onClick={handleDetalhadoClick}>Detalhado</Button>
                </Row>
            }
            bordered
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item style={{ background: index % 2 === 0 ? 'white' : '#f0f0f0', }}>
                    <Typography.Text mark>[DATA]</Typography.Text> {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${item.processo} (${item.duracao || 'Sem duração'})`}
                </List.Item>
            )}
        />
    );
}

export default Resume;