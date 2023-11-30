import { Button, List, Row, Typography } from "antd";
import { useState } from "react";



const quotation = [
    'Dia - Data Inicial  -  Data Final  -  Processo (duração)',
    '085 [21/02/2024] [23/02/2024] TS - PROD Ensaios (3 dias)',
    '098 [05/03/2024] [05/03/2024] 1 peça(s) liberada(s) para embarque',
];
const resume = [
    'Dia - Data Inicial  -  Data Final  -  Processo (duração)',
    '091 [27/02/2024] [04/03/2024] TS - PROD Tempo de Espera (5 dias)',
    '098 [05/03/2024] [05/03/2024] 1 peça(s) liberada(s) para embarque',
];
const details = [
    '000 [28/11/2023] ',
    '001 [29/11/2023] TS - CONT Avaliação da Adm. Contratos (1 dia)',
    '002 [30/11/2023] TS - PCP Planejar PCP (1 dia)',
    '003 [01/12/2023] TS - ENG Gestão Técnica (2 dias)',
    '004 [02/12/2023] Sábado',
    '005 [03/12/2023] Domingo',
    '006 [04/12/2023] ',
    '007 [05/12/2023] TS - ENG - Criar ECM (1 dia)',
];

const Resume: React.FC = () => {

    const [data, setData] = useState(quotation);
    const handleResumoClick = () => {
        setData(quotation);
    };
    const handleResumidoClick = () => {
        setData(resume);
    };
    const handleDetalhadoClick = () => {
        setData(details);
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
            renderItem={(item) => (
                <List.Item>
                    <Typography.Text mark>[DATA]</Typography.Text> {item}
                </List.Item>
            )}
        />

    );
}
export default Resume;