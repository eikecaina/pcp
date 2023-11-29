import { Button, Card, Checkbox, Col, DatePicker, Form, Modal, Radio, Row, message } from "antd";
import CustomInputNumber from "../CustomInputNumber";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { ExclamationCircleOutlined } from "@ant-design/icons";


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
        <ul style={{ listStyle: 'none' }}>
            {datasExample.map((item, index) => (
                <li key={index}>{item.data + ' - ' + item.peça + ' peças'}</li>
            ))}
        </ul>
    );
};

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

dayjs.extend(customParseFormat);

const ConfigModal = () => {
    Modal.confirm({
        title: 'Configurações',
        width: 990,
        content: (
            <Card>
                <Row gutter={10}>
                    <Col span={12}>
                        
                            <Radio.Group>
                                <Form.Item>
                                    <Radio value={1}>Certificado</Radio>
                                </Form.Item>
                                <Form.Item>
                                    <Radio value={2}>Aprovação em dias corridos</Radio>
                                </Form.Item>
                            </Radio.Group>
                            <Form.Item label="Dias">
                                <CustomInputNumber min={0} maxLength={3} style={{ width: 50 }} />
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
                        
                    </Col>
                    <Col span={12}>
                        
                            <Form.Item label="Entrega em">
                                <DatePicker style={{ width: '100%' }} defaultValue={dayjs('00/00/0000', dateFormatList[0])} format={dateFormatList} />
                            </Form.Item>
                            <Form.Item label="Quantidade" rules={[{ required: true, message: 'Por favor, selecione o Item!' }]}>
                                <CustomInputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Row justify={'space-evenly'}>
                                <Button type="primary" onClick={successMsg} style={{ backgroundColor: '#95de64' }}>
                                    Salvar
                                </Button>
                                <Button onClick={confirmDelete} type="primary">
                                    Limpar
                                </Button>
                            </Row>
                            <Card
                                title="Lista de entregas"
                                style={{ marginTop: 15, overflowY: 'auto', maxHeight: '178px' }}
                                bodyStyle={{ padding: 0, margin: 0 }}
                                headStyle={{
                                    position: 'fixed',
                                    background: '#fff',
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #e8e8e8',
                                    width: 372,
                                }}
                            >
                                {listDates()}
                            </Card>
                        
                    </Col>
                </Row>
            </Card>
        ),
        okText: 'Confirmar',
        cancelText: 'Cancelar',
    });
};

export default ConfigModal
