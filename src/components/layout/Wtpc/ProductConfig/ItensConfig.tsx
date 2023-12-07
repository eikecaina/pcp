import React, { useState } from 'react';
import { Card, Col, Form, Row, Button, Select, Input, Modal, message, FloatButton, Tour, Space } from 'antd';
import { CalendarOutlined, ExclamationCircleOutlined, PlusOutlined, PrinterOutlined, QuestionCircleOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import CustomInputNumber from '../CustomInputNumber';
import ConfigModal from './ConfigModal';
import TutorialTour from '../Tutorial/TutorialNewQuotation';
import Resume from './Resume';
import SearchQuotation from '../OpenQuotation/SearchQuotation';


const ItensConfig: React.FC = () => {
    const { refs, steps } = TutorialTour();
    const [openTour, setOpenTour] = useState(false);
    const [showPower, setShowPower] = useState(false);
    const [showVoltage, setShowVoltage] = useState(false);
    const [showMaterial, setShowMaterial] = useState(false);
    const [selectOptions, setSelectOptions] = useState([{ value: '10' }]);
    const [selectedItem, setSelectedItem] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const addOptions = () => {
        const lastOptionValue = parseInt(selectOptions[selectOptions.length - 1].value, 10);
        const newOptions = Array.from({ length: 1 }, (_, index) => ({
            value: `${lastOptionValue + (index + 1) * 10}`,
        }));

        setSelectedItem(parseInt(newOptions[newOptions.length - 1].value));
        setSelectOptions((prevOptions) => [...prevOptions, ...newOptions]);
        message.success('Item Criado');
    };

    const removeOptions = () => {
        if (selectOptions.length > 1) {

            const newOptions = selectOptions.filter(object => {
                return object.value !== selectedItem.toString();
            });

            setSelectOptions(newOptions);
            setSelectedItem(parseInt(newOptions[0].value))

            message.error('Item Excluído');
        } else {
            message.warning('Não é possível remover mais itens.');
        }
    };

    const confirmDelete = () => {
        Modal.confirm({
            title: 'Excluir?',
            icon: <ExclamationCircleOutlined />,
            content: 'Deseja excluir o Item?',
            okText: 'Confirmar',
            cancelText: 'Cancelar',
            onOk: removeOptions,
        });
    };

    const handleOperetion = (value) => {
        if (value === 'Óleo') {
            setShowPower(true);
        } else if (value === '0 a 15') {
            setShowVoltage(true);
        } else if (value === '15 a 36') {
            setShowMaterial(true);
        }
    };

    return (
        <Row gutter={8}>
            <Col span={8} style={{ height: 776 }}>
                <Card title="Configuração de itens gerais" style={{ height: '100%' }}>
                    <Row>
                        <Col span={24}>
                            <Form>

                                <div ref={refs[0]}>

                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                        label="Cliente"
                                        name="cliente"
                                        rules={[{ required: true, message: 'Por favor, insira o Cliente!' }]}>
                                        <Space.Compact style={{ width: '100%' }}>
                                            <Input />
                                            <Button style={{ borderRadius: 3 }} onClick={handleOpenModal}><SearchOutlined /></Button>
                                            <SearchQuotation isModalOpen={isModalOpen} setModalIsOpen={setIsModalOpen} />
                                        </Space.Compact>
                                    </Form.Item>

                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                        label="Item"
                                        name="item"
                                        rules={[{ required: true, message: 'Por favor, selecione o Item!' }]}
                                    >
                                        <Space.Compact style={{ width: '100%' }}>
                                            <Select value={selectedItem} onChange={(value) => setSelectedItem(value)} options={selectOptions} />
                                            <Button ref={refs[1]} onClick={addOptions} style={{ backgroundColor: '#95de64' }}><PlusOutlined /></Button>
                                        </Space.Compact>
                                    </Form.Item>

                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                        label="Cotação"
                                        name="cotacao"
                                        rules={[{ required: true, message: 'Por favor, insira a Cotação!' }]}>
                                        <CustomInputNumber style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                        label="ODV"
                                        name="odv"
                                        rules={[{ required: true, message: 'Por favor, insira o ODV!' }]}>
                                        <CustomInputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}
                                    >
                                        <Button ref={refs[2]} type="primary" onClick={ConfigModal} style={{ backgroundColor: '#95de64', width: '100%' }}>
                                            Configuração
                                        </Button>
                                    </Form.Item>

                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }}
                                    >
                                        <Button ref={refs[3]} onClick={confirmDelete} type="primary" style={{ backgroundColor: '#f5222d', width: '100%' }}>
                                            Excluir Item
                                        </Button>
                                    </Form.Item>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                    <FloatButton.Group shape='square' style={{ right: 50, bottom: 90 }}>
                        <FloatButton type='default'
                            onClick={() => window.location.href = '/pcp/pcpData'}
                            icon={<CalendarOutlined />}
                        />
                        <FloatButton type="default" icon={<SaveOutlined />} />
                        <FloatButton
                            onClick={() => setOpenTour(true)}
                            type="default"
                            icon={<QuestionCircleOutlined />}
                        />
                        {openTour && <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />}
                    </FloatButton.Group>


                    <Card ref={refs[4]} style={{ overflowY: 'auto', maxWidth: '100%', height: 475 }}>
                        <Form layout="vertical">
                            <Form.Item label="Meio de operação">
                                <Select options={[{ value: 'Óleo' }, { value: 'Seco' }]} onChange={handleOperetion} />
                            </Form.Item>
                            {showPower && (
                                <Form.Item label="Potência em kVA">
                                    <Select options={[{ value: '0 a 15' }]} onChange={handleOperetion} />
                                </Form.Item>
                            )}
                            {showVoltage && (
                                <Form.Item label="Classe de tensão">
                                    <Select options={[{ value: '15 a 36' }]} onChange={handleOperetion} />
                                </Form.Item>
                            )}
                            {showMaterial && (
                                <Form.Item label="Materiais críticos">
                                    <Select options={[{ value: 'Bucha' }]} />
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