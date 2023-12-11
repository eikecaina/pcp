import { Button, Card, Checkbox, Col, DatePicker, Form, Modal, Radio, Row, Space, message } from "antd";
import CustomInputNumber from "../CustomInputNumber";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";


const successMsg = () => {
    message.success('Item Criado');
};

const excludeMsg = () => {
    message.error('Item Excluido');
};

const confirmDelete = () => {
    Modal.confirm({
        title: 'Excluir?',
        icon: <ExclamationCircleOutlined />,
        content: 'Deseja excluir o Item?',
        okText: 'Confirmar',
        cancelText: 'Cancelar',
        onOk: excludeMsg,
    });
};

const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
};

const listDates = () => {
    const datasExample = [
        { data: '24/02/2024', peça: 1 },
        { data: '22/04/2024', peça: 3 },
        { data: '21/07/2024', peça: 6 },
        { data: '26/09/2024', peça: 7 },
        { data: '28/01/2024', peça: 8 },
        { data: '21/07/2024', peça: 3 },
        { data: '21/07/2024', peça: 2 },
        { data: '22/07/2024', peça: 4 },
        { data: '23/07/2024', peça: 1 },
        { data: '25/07/2024', peça: 10 },
    ];

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, }}>
            {datasExample.map((item, index) => (
                <li style={{
                    marginBottom: 3,
                    background: index % 2 === 0 ? 'white' : '#f0f0f0',
                    padding: 2
                }}
                    key={index}>{item.data + ' - ' + item.peça + ' peças'}</li>
            ))}
        </ul>
    );
};

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
dayjs.extend(customParseFormat);

interface ConfigModalProps {
    setIsModalConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ setIsModalConfigOpen }) => {
    const [disabelInput, setDisabelInput] = useState(1);

    const handleCancel = () => {
        setIsModalConfigOpen(false);
    };

    const handleOk = () => {
        setIsModalConfigOpen(false); // Fechar o modal após a confirmação
    };

    return (
        <Modal
            title="Configurações"
            open={true}
            onCancel={handleCancel}
            onOk={handleOk}
            width={990}
            okText="Confirmar"
            cancelText="Cancelar"

        >
            <Row gutter={10}>
                <Col span={12}>
                    <Card title="Configuração de item" style={{ height: '100%' }}>
                        <Radio.Group onChange={(e) => setDisabelInput(e.target.value)} value={disabelInput}>
                            <Space direction="vertical" style={{ marginBottom: 20 }}>
                                <Radio value={1}>Certificado</Radio>
                                <Radio value={2}>Aprovação em dias corridos</Radio>
                            </Space>
                        </Radio.Group>
                        <Form.Item label="Dias">
                            <CustomInputNumber disabled={disabelInput !== 2} min={0} maxLength={3} style={{ width: 50 }} />
                        </Form.Item>
                        <Form.Item label="Numero do Claim">
                            <CustomInputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Numero do novo material">
                            <CustomInputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label={<Checkbox onChange={onChange}>Repetição do material</Checkbox>}>
                            <CustomInputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Entrega">
                        <Form.Item label="Entrega em">
                            <DatePicker style={{ width: '100%' }} defaultValue={dayjs('00/00/0000', dateFormatList[0])} format={dateFormatList} />
                        </Form.Item>
                        <Form.Item label="Quantidade" rules={[{ required: true, message: 'Por favor, selecione o Item!' }]}>
                            <CustomInputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Row justify={'space-evenly'}>
                            <Button type="primary" onClick={successMsg} style={{ width: '100%', maxWidth: 150, textAlign: 'center', backgroundColor: '#95de64' }}>
                                Salvar
                            </Button>
                            <Button style={{ width: '100%', maxWidth: 150, textAlign: 'center' }} onClick={confirmDelete} type="primary">
                                Limpar
                            </Button>
                        </Row>
                        <Card
                            style={{ marginTop: 15, overflowY: 'auto', maxHeight: '178px', maxWidth: '100%' }}
                            bodyStyle={{ padding: 0, margin: 0 }}
                        >
                            {listDates()}
                        </Card>
                    </Card>
                </Col>
            </Row >
        </Modal>
    )
};

export default ConfigModal
