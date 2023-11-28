import React, { useState, useRef } from 'react';
import { Card, Col, Form, Row, Button, Select, Input, Modal, Radio, message, FloatButton, TourProps, Tour, Checkbox, InputNumber, DatePickerProps, DatePicker } from 'antd';
import { ExclamationCircleOutlined, FileOutlined, PrinterOutlined, QuestionCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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

const ItensConfig: React.FC = () => {
    const [operetion, setOperetion] = useState('');
    const [showPower, setShowPower] = useState(false);
    const [showVoltage, setShowVoltage] = useState(false);

    const [selectOptions, setSelectOptions] = useState([
        { value: '10' },
    ]);

    const handleOperetionChange = (value) => {
        setOperetion(value);
        setShowPower(value === 'Óleo');
        setShowVoltage(value === 'Seco');
    };

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const refs = [useRef(null), useRef(null), useRef(null)];

    const [open, setOpen] = useState<boolean>(false);

    const configItem = () => {
        Modal.confirm({
            title: 'Configurações',
            width: 990,
            content: (
                <Card>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Card title="Configuração de item">
                                <Radio.Group>
                                    <Form.Item>
                                        <Radio value={1}>Certificado</Radio>
                                    </Form.Item>
                                    <Form.Item>
                                        <Radio value={2}>Aprovação em dias corridos</Radio>
                                    </Form.Item>
                                </Radio.Group>
                                <Form.Item label="Dias">
                                    <InputNumber min={0} maxLength={3} controls={false} style={{ width: 50 }} />
                                </Form.Item>
                                <Form.Item label="Numero do Claim">
                                    <InputNumber controls={false} />
                                </Form.Item>
                                <Form.Item label="Numero do novo material">
                                    <InputNumber controls={false} />
                                </Form.Item>
                                <Form.Item label={<Checkbox onChange={onChange}>Repetição do material</Checkbox>}>
                                    <Input />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Configuração de entrega">
                                <Form.Item label="Entrega em">
                                    <DatePicker style={{ width: '100%' }} defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
                                </Form.Item>
                                <Form.Item label="Quantidade" rules={[{ required: true, message: 'Por favor, selecione o Item!' }]}>
                                    <InputNumber style={{ width: '100%' }} controls={false} />
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
                            </Card>
                        </Col>
                    </Row>
                </Card>
            ),
            okText: 'Confirmar',
            cancelText: 'Cancelar',
        });
    };

    const addOptions = () => {
        const lastOptionValue = parseInt(selectOptions[selectOptions.length - 1].value, 10);

        const newOptions = Array.from({ length: 1 }, (_, index) => ({
            value: `${lastOptionValue + (index + 1) * 10}`,
        }));

        setSelectOptions((prevOptions) => [...prevOptions, ...newOptions]);

        successMsg();
    };

    const steps: TourProps['steps'] = [
        {
            title: 'Crie mais itens',
            description: 'Ao clicar, você adiciona mais um item para a cotação atual',
            target: () => refs[0].current,
        },
        {
            title: 'Configure o item',
            description: 'Configure o item atual selecionado na lista',
            target: () => refs[1].current,
        },
        {
            title: 'Excluir o item',
            description: 'Exclue o item atual selecionado, cuidado!',
            target: () => refs[2].current,
        },
    ];

    return (
        <Card title="Configuração de itens gerais" style={{ height: '100%' }}>
            <Row>
                <Col span={24}>
                    <Form>
                        <Row gutter={5}>
                            <Col span={12}>
                                <Form.Item label="Cliente" name="cliente" rules={[{ required: true, message: 'Por favor, insira o Cliente!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Item"
                                    name="item"
                                    rules={[{ required: true, message: 'Por favor, selecione o Item!' }]}
                                >
                                    <Select defaultValue={10} options={selectOptions} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row align="middle" gutter={5}>
                            <Col span={12}>
                                <Form.Item label="Cotação" name="cotacao" rules={[{ required: true, message: 'Por favor, insira a Cotação!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="ODV" name="odv" rules={[{ required: true, message: 'Por favor, insira o ODV!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={8}>
                                <Form.Item>
                                    <Button ref={refs[0]} type="primary" onClick={addOptions} style={{ backgroundColor: '#95de64', width: '100%' }}>
                                        Novo Item
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item>
                                    <Button ref={refs[1]} type="primary" onClick={configItem} style={{ backgroundColor: '#bfbfbf', width: '100%' }}>
                                        Configuração
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item>
                                    <Button ref={refs[2]} onClick={confirmDelete} type="primary" style={{ width: '100%' }}>
                                        Excluir Item
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <FloatButton.Group shape='square' style={{ right: 50, bottom: 90 }}>
                <FloatButton type="default" icon={<PrinterOutlined />} />
                <FloatButton type="default" icon={<SaveOutlined />} />
                <FloatButton
                    onClick={() => setOpen(true)}                 
                    type="default"
                    icon={<QuestionCircleOutlined />}
                />
            </FloatButton.Group>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

            <Card style={{ maxWidth: '100%', height: 475 }}>
                <Form style={{ overflowY: 'auto' }} layout="vertical">
                    <Form.Item label="Meio de operação">
                        <Select options={[{ value: 'Óleo' }, { value: 'Seco' }]} onChange={handleOperetionChange} />
                    </Form.Item>
                    {showPower && (
                        <Form.Item label="Potência em kVA">
                            <Select options={[{ value: '0 a 15' }]} />
                        </Form.Item>
                    )}
                    {showVoltage && (
                        <Form.Item label="Classe de tensão">
                            <Select options={[{ value: '15 a 36' }]} />
                        </Form.Item>
                    )}
                </Form>
            </Card>
            <Button style={{ float: 'right', marginTop: 10 }} type="primary">
                Calcular
            </Button>
        </Card>
    );
};

export default ItensConfig;