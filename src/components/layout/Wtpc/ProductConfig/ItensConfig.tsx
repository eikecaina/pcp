import React, { useState } from 'react';
import { Card, Col, Form, Row, Button, Select, Input, Modal, message, FloatButton, Tour } from 'antd';
import { ExclamationCircleOutlined, PrinterOutlined, QuestionCircleOutlined, SaveOutlined } from '@ant-design/icons';
import CustomInputNumber from '../CustomInputNumber';
import ConfigModal from './ConfigModal';
import TutorialTour from '../Tutorial/TutorialNewQuotation';
import Resume from './Resume';


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

const ItensConfig: React.FC = () => {


    const { refs, steps } = TutorialTour();
    const [openTour, setOpenTour] = useState(false);

    const [operetion, setOperetion] = useState('');
    const [showPower, setShowPower] = useState(false);
    const [showVoltage, setShowVoltage] = useState(false);
    const [selectOptions, setSelectOptions] = useState([{ value: '10' }]);
    const handleOperetionChange = (value) => {
        setOperetion(value);
        setShowPower(value === 'Óleo');
        setShowVoltage(value === 'Seco');
    };
    const addOptions = () => {
        const lastOptionValue = parseInt(selectOptions[selectOptions.length - 1].value, 10);

        const newOptions = Array.from({ length: 1 }, (_, index) => ({
            value: `${lastOptionValue + (index + 1) * 10}`,
        }));

        setSelectOptions((prevOptions) => [...prevOptions, ...newOptions]);

        successMsg();
    };

    return (

        <Row gutter={8}>
            <Col span={8} style={{ height: 776 }}>
                <Card title="Configuração de itens gerais" style={{ height: '100%' }}>

                    <Row>
                        <Col span={24}>
                            <Form>

                                <div ref={refs[0]}>
                                    <Row gutter={5}>

                                        <Col span={12}>
                                            <Form.Item
                                                labelCol={{ span: 7, pull: 0 }}
                                                label="Cliente"
                                                name="cliente"
                                                rules={[{ required: true, message: 'Por favor, insira o Cliente!' }]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                labelCol={{ span: 7 }}
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
                                            <Form.Item
                                                labelCol={{ span: 7 }}
                                                label="Cotação"
                                                name="cotacao"
                                                rules={[{ required: true, message: 'Por favor, insira a Cotação!' }]}>
                                                <CustomInputNumber style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                labelCol={{ span: 7 }}
                                                label="ODV"
                                                name="odv"
                                                rules={[{ required: true, message: 'Por favor, insira o ODV!' }]}>
                                                <CustomInputNumber style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>

                                <Row gutter={10}>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Button ref={refs[1]} type="primary" onClick={addOptions} style={{ backgroundColor: '#95de64', width: '100%' }}>
                                                Novo Item
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Button ref={refs[2]} type="primary" onClick={ConfigModal} style={{ backgroundColor: '#bfbfbf', width: '100%' }}>
                                                Configuração
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Button ref={refs[3]} onClick={confirmDelete} type="primary" style={{ width: '100%' }}>
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
                            onClick={() => setOpenTour(true)}
                            type="default"
                            icon={<QuestionCircleOutlined />}
                        />
                        {openTour && <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />}
                    </FloatButton.Group>


                    <Card ref={refs[4]} style={{ maxWidth: '100%', height: 475 }}>
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

                    <Button ref={refs[5]} style={{ float: 'right', marginTop: 10 }} type="primary">
                        Calcular
                    </Button>
                </Card>
            </Col>
            <Col span={16} style={{ height: 776 }}>
                <div
                    ref={refs[6]}
                    style={{ height: '100%', overflowY: 'auto', maxHeight: '100%', width: '100%' }}
                >
                    <Resume></Resume>
                </div>
            </Col>
        </Row>

    );
};

export default ItensConfig;