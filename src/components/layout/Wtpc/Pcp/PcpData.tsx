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
        <Row gutter={6}>
            <Col span={9}>
                <Card bodyStyle={{ padding: 0 }} style={{ height: '100%', borderTop: 'none', maxHeight: 714, padding: 0, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                    <Divider orientation='left'>Entregas</Divider>
                    <div style={{ height: '100%', borderTop: 'none', maxHeight: 165, margin: '0 5px 0 5px', overflowY: "auto" }}>
                        <List
                            style={{ height: 235 }}
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
                    </div>
                    <Divider orientation='left'>Detalhes</Divider>
                    <div style={{ overflowY: 'auto', height: '100%', maxHeight: 387, padding: 10 }}>
                        <Form layout='vertical'>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(33.33% - 8px)' }}
                                label="OV"
                                colon={false}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(33.33% - 8px)', margin: '0 8px' }}
                                label="Item OV"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(33.33% - 8px)' }}
                                label="Claim de planejamento"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                label="Item FERT"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                label="Ordem de produção"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                label="Potência"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'  }}
                                label="Classe de tensão"
                            >
                                <Input />
                            </Form.Item>

                           
                            <Form.Item
                            style={{ margin: '0 8px 20px 0px' }}
                                label="Observações"
                            >
                                <TextArea
                                    placeholder="Digite suas observações aqui"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ margin: 10, display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Item
                            colon={false}
                            label="Inspeção"
                        >
                            <Checkbox></Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' style={{ backgroundColor: '#95de64' }}>Salvar</Button>
                        </Form.Item>
                    </div>
                </Card>
            </Col>
            <Col span={8}>
                <Card bodyStyle={{ padding: 0 }} style={{ borderTop: 'none', padding: 0, width: '100%', height: '100%', maxHeight: 714, borderTopLeftRadius: 0, borderTopRightRadius: 0  }}>
                    <Divider orientation='left'>Processos</Divider>
                    <Tree
                        style={{ overflowY: "auto", height: 665, maxHeight: 607 }}
                        showLine={true}
                        defaultExpandedKeys={['0-0-0']}
                        treeData={treeData}
                    />
                    <div style={{ padding: 10 }}>
                        <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'space-evenly' }}>
                            <Button type='primary' style={{ width: 'calc(30% - 8px)', backgroundColor: '#95de64' }}>Confirmar</Button>
                            <Button type='primary' style={{ width: 'calc(30% - 8px)', backgroundColor: '#f5222d' }}>Excluir</Button>
                        </div>
                    </div>

                </Card>

            </Col>
            <Col span={7}>

                <Card bodyStyle={{ padding: 0 }} style={{ width: '100%', borderTop: 'none', height: '100%', maxHeight: 714, borderTopLeftRadius: 0, borderTopRightRadius: 0  }}>
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
                    <Divider orientation='left' style={{ margin: 0 }}>Consumo</Divider>
                    <div style={{ maxHeight: 334 }}>
                        <Form style={{ margin: 10 }}>
                            <div style={{ height: '100%', maxHeight: 123, overflowY: "auto", marginBottom: 15 }}>
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
                    <Card bodyStyle={{ padding: 10, margin: 0, float: "right" }} bordered={false}>
                        <Button type='primary' style={{ backgroundColor: '#bfbfbf' }}>Editar</Button>
                    </Card>
                </Card>
            </Col>
        </Row >

    )
}

export default PcpData
