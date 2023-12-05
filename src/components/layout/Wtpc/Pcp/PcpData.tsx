import { CarryOutOutlined, FlagOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Divider, Form, Input, List, Row, Tree } from 'antd'
const { TextArea } = Input;
import axios from 'axios';
import React, { useEffect, useState } from 'react'


interface DataNode {
    title: string;
    key: string;
    icon?: React.ReactNode;
    children?: DataNode[];
}

const PcpData: React.FC = () => {
    const [dataExample, setDataExample] = useState<any[]>([]);
    const [treeData, setTreeData] = useState<DataNode[]>([]);

    async function axiosData() {
        try {
            const response = await axios.get('http://localhost:8080/');
            const dataExample = response.data.registros.find(item => item.tipo === "data-example")?.dados || [];
            const treeData = response.data.registros.find(item => item.tipo === "processos")?.dados || [];

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
        } catch (error) {
            console.error('Erro ao acessar a API:', error.message);
        }
    }

    useEffect(() => {
        axiosData();
    }, []);

    return (

        <Row gutter={6} style={{ height: '100%', maxHeight: 800 }}>
            <Col span={9}>
                <Card bodyStyle={{ padding: 0 }} style={{ height: '100%', maxHeight: '100%', padding: 0, width: '100%' }}>
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
                    <Card bodyStyle={{ padding: '0 10px 0 10px', overflowY: 'auto', maxHeight: 408 }} bordered={false}>
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
                        <Button type='primary' style={{ float: 'right', marginBottom: 5, width: '100%', maxWidth: 100 }}>Salvar</Button>
                    </Card>

                </Card>
            </Col>
            <Col span={5}>
                <Card bodyStyle={{ padding: 0 }} style={{ padding: 0, width: '100%', height: '100%', maxHeight: '100%' }}>
                    <Divider orientation='left'>Processos</Divider>
                    <Tree
                        style={{ overflowY: "auto", height: '100%', maxHeight: 585 }}
                        showLine={true}
                        defaultExpandedKeys={['0-0-0']}
                        treeData={treeData}
                    />

                    <Card bordered={false} style={{ position: 'fixed', width: '100%', maxWidth: 362, margin: '50px 0 0 0' }}>

                        <Row gutter={110}>
                            <Col span={12}>
                                <Button style={{ width: '100%', maxWidth: 100, background: 'rgb(149, 222, 100)' }} type='primary'>Confirmar</Button>
                            </Col>
                            <Col span={12}>
                                <Button style={{ width: '100%', maxWidth: 100, backgroundColor: '#ff4d4f' }} type='primary'>Excluir</Button>
                            </Col>
                        </Row>
                    </Card>

                </Card>

            </Col>
            <Col span={10}>
                <Card style={{ height: '100%', minHeight: 725, overflowY: "auto" }}>
                    <Card>

                    </Card>
                </Card>
            </Col>
        </Row>

    )
}

export default PcpData
