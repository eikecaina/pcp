import React, { useState } from 'react';
import { Card, Col, Form, Row, Button, Select, Input, Modal, message, FloatButton, Space } from 'antd';
import { CalendarOutlined, ExclamationCircleOutlined, FolderOpenOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CustomInputNumber from '../CustomInputNumber';
import ConfigModal from './ConfigModal';

import Resume from './Resume';
import SearchQuotation from '../OpenQuotation/SearchQuotation';
import Link from 'next/link';


const ItensConfig: React.FC = () => {
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
            <Col span={10} style={{ height: '100%', minHeight: 776 }}>
                <Card bodyStyle={{ padding: 10 }} title="Configuração de itens gerais">
                    <Row>
                        <Col span={24}>
                            <Form layout='vertical'>

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
                                        <Button type='primary' onClick={addOptions} style={{ backgroundColor: '#95de64' }}><PlusOutlined /></Button>
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


                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(28% - 8px)' }}
                                    >
                                        <Button type="primary" onClick={ConfigModal} style={{ backgroundColor: '#95de64', width: '100%' }}>
                                            Configuração
                                        </Button>
                                    </Form.Item>

                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(28% - 8px)', margin: '0 8px' }}
                                    >
                                        <Button onClick={confirmDelete} type="primary" style={{ backgroundColor: '#f5222d', width: '100%' }}>
                                            Excluir Item
                                        </Button>
                                    </Form.Item>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                    <FloatButton.Group
                        trigger='hover'
                        icon={<FolderOpenOutlined />}
                        style={{ right: 50, bottom: 90 }}
                    >
                        <Link href={'/pcp/pcpPage'}>
                            <FloatButton tooltip={<div>PCP</div>} type='default' icon={<CalendarOutlined />} />
                        </Link>
                    </FloatButton.Group>


                    <Card style={{ overflowY: 'auto', height: 427 }}>
                        <Form layout="vertical">
                            <Form.Item colon={false} label="Meio de operação">
                                <Select style={{ width: '100%', maxWidth: 350 }} options={[{ value: 'Óleo' }, { value: 'Seco' }]} onChange={handleOperetion} />
                            </Form.Item>
                            {showPower && (
                                <Form.Item label="Potência em kVA" style={{ width: '100%' }}>
                                    <Select style={{ width: '100%', maxWidth: 350 }} options={[{ value: '0 a 15' }]} onChange={handleOperetion} />
                                </Form.Item>
                            )}
                            {showVoltage && (
                                <Form.Item label="Classe de tensão">
                                    <Select style={{ width: '100%', maxWidth: 350 }} options={[{ value: '15 a 36' }]} onChange={handleOperetion} />
                                </Form.Item>
                            )}
                            {showMaterial && (
                                <Form.Item label="Materiais críticos">
                                    <Select style={{ width: '100%', maxWidth: 350 }} options={[{ value: 'Bucha' }]} />
                                </Form.Item>
                            )}
                        </Form>
                    </Card>
                    <div style={{ float: 'right', marginTop: 10 }}>
                        <Button type="primary">
                            Calcular
                        </Button>
                    </div>
                </Card>
            </Col>
            <Col span={14}>
                <div
                    style={{ height: '100%', overflowY: 'auto', maxHeight: '100%', width: '100%' }}
                >
                    <Resume></Resume>
                </div>
            </Col>
        </Row>

    );
};

export default ItensConfig;