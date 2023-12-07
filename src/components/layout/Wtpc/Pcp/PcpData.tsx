import React, { useEffect, useState } from 'react'
import { ExclamationCircleOutlined, FlagOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Divider, Form, Input, List, Radio, Row, Space, Tree, DatePicker, Select, Modal } from 'antd'
import CustomInputNumber from '../CustomInputNumber';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { TextArea } = Input;

import dayjs from 'dayjs';
import axios from 'axios';


interface DataNode {
    title: string;
    key: string;
    icon?: React.ReactNode;
    children?: DataNode[];
}


dayjs.extend(customParseFormat);
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const PcpData: React.FC = () => {
    const [dataExample, setDataExample] = useState<any[]>([]);
    const [treeData, setTreeData] = useState<DataNode[]>([]);
    const [resourceExample, setResourceExample] = useState<any[]>([]);

    async function axiosData() {
        try {
            const response = await axios.get('http://localhost:8080/');
            const dataExample = response.data.registros.find(item => item.tipo === "data-example")?.dados || [];
            const treeData = response.data.registros.find(item => item.tipo === "processos")?.dados || [];
            const resourceExample = response.data.registros.find(item => item.tipo === "resources")?.dados || [];

            const procPcpData: DataNode[] = treeData.map((item, index) => {
                return {
                    title: `${item.title}`,
                    key: `${item.key}`,
                    children: [
                        {
                            title: `${item.children[0].title}`,
                            key: `${item.children[0].key}`,
                        },
                        {
                            title: `${item.children[1].title}`,
                            key: `${item.children[1].key}`,
                        },
                    ],
                };
            });

            setDataExample(dataExample);
            setTreeData(procPcpData)
            setResourceExample(resourceExample);
        } catch (error) {
            console.error('Erro ao acessar a API:', error.message);
        }
    }

    useEffect(() => {
        axiosData();
    }, []);

    return (
        <Row gutter={6} style={{ height: '100%', maxHeight: 800 }}>
            <Col span={8}>
                <Card bodyStyle={{ padding: 0 }} style={{ height: '100%', maxHeight: 780, padding: 0, width: '100%' }}>
                    <Divider orientation='left'>Entregas</Divider>
                    <Card bodyStyle={{ padding: 0, margin: 0 }} style={{ height: '100%', maxHeight: 718, margin: '0 5px 0 5px', overflowY: "auto" }}>
                        <List
                            style={{ height: 250 }}
                            dataSource={dataExample}
                            renderItem={(item, index) => (
                                <List.Item
                                    style={{
                                        background: index % 2 === 0 ? 'white' : '#f0f0f0',
                                        padding: 10,
                                    }}
                                >
                                    <FlagOutlined style={{ marginRight: 10, color: 'blue' }} />
                                    {`${item.dia} ${item.quantidade}`}
                                </List.Item>
                            )}>
                        </List>
                    </Card>
                    <Divider orientation='left'>Detalhes</Divider>
                    <Card bodyStyle={{ padding: '0 10px 0 10px', overflowY: 'auto', maxHeight: 407 }} bordered={false}>
                        <Form layout='vertical'>
                            <Form.Item
                                label="Observações:"
                            >
                                <TextArea
                                    placeholder="Digite suas observações aqui"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="OV:"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Item OV:"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Potência:"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Classe de tensão:"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Claim de planejamento:"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Item FERT:"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Ordem de produção:"
                            >
                                <Input />
                            </Form.Item>
                        </Form>

                        <Form.Item
                            label="Inspeção:"
                        >
                            <Checkbox></Checkbox>
                        </Form.Item>
                    </Card>

                </Card>
            </Col>
            <Col span={8}>
                <Card bodyStyle={{ padding: 0 }} style={{ padding: 0, width: '100%', height: '100%', maxHeight: 790 }}>
                    <Divider orientation='left'>Processos</Divider>
                    <Tree
                        style={{ overflowY: "auto", height: '100%', maxHeight: 655, minHeight: 705 }}
                        showLine={true}
                        defaultExpandedKeys={['0-0-0']}
                        treeData={treeData}
                    />
                </Card>

            </Col>
            <Col span={8}>

                <Card bordered={false} bodyStyle={{ padding: 0 }} style={{ width: '100%', height: '100%', minHeight: 725, maxHeight: 775 }}>
                    <Divider orientation='left'>Planejamento</Divider>
                    <Form style={{ margin: 15 }}>
                        <Radio.Group
                            defaultValue={1}
                        >
                            <Space direction="vertical" style={{ marginBottom: 15 }}>
                                <Radio value={1} disabled>Automático</Radio>
                                <Radio value={2} disabled>Manual</Radio>
                            </Space>
                        </Radio.Group>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                label="Inicio"
                                rules={[{ required: true }]}
                            >
                                <DatePicker defaultValue={dayjs('00/00/0000', dateFormatList[0])} format={dateFormatList[0]} disabled style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                rules={[{ required: true }]}

                            >
                                <DatePicker defaultValue={dayjs('00/00/0000', dateFormatList[0])} format={dateFormatList[0]} disabled style={{ width: '100%' }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="Duração"
                            style={{ display: 'inline-block', width: 'calc(60% - 8px)' }}
                        >
                            <CustomInputNumber value={1102} disabled style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}
                        >
                            <Select value={"Minutos"} disabled />
                        </Form.Item>
                        <Form.Item
                            label="Recurso"
                            style={{ display: 'inline-block', width: '99%' }}
                        >
                            <Input value={"TS - Elétrico - Rodrigo (lauffer)"} disabled style={{ width: '100%' }} />
                        </Form.Item>
                    </Form>
                    <Divider orientation='left'>Consumo</Divider>
                    <div style={{ overflowY: 'auto', maxHeight: 425 }}>
                        <Form style={{ margin: 10 }}>
                            <div style={{ height: '100%', maxHeight: 718, overflowY: "auto", marginBottom: 15 }}>
                                <List
                                    style={{ height: 213 }}
                                    dataSource={resourceExample}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            style={{
                                                background: index % 2 === 0 ? 'white' : '#f0f0f0',
                                                padding: 10,
                                            }}
                                        >
                                            <ExclamationCircleOutlined style={{ marginRight: 10, color: ' #FFBF00' }} />
                                            {`${item.data} ${item.consume}`}
                                        </List.Item>
                                    )}>
                                </List>
                            </div>
                            <Form.Item
                                label="Recurso"
                                style={{ display: 'inline-block', width: 'calc(60% - 8px)' }}
                            >
                                <Input value={"TS - Elétrico - Rodrigo (lauffer)"} disabled style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Fim"
                                style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}
                            >
                                <DatePicker defaultValue={dayjs('07/12/2024', dateFormatList[0])} format={dateFormatList[0]} disabled style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Consumo em minutos"
                                style={{ display: 'inline-block', width: 'calc(100% - 8px)' }}
                            >
                                <CustomInputNumber value={"420"} disabled style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Notas"
                            >
                                <TextArea
                                    value={"Abatimento com cálculo automático por Vendas."}
                                    disabled
                                    style={{ height: 50, resize: 'none' }}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>

    )
}

export default PcpData
