import React, { useState } from 'react';

import { Card, Col, Form, Row, Button, Select, Space } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';



const { Option } = Select;

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};


const BoxContent: React.FC = () => {
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
        <Row gutter={5}>
            <Col span={5}>
                <Card title="Dados Gerais Cotação" bordered={false}>
                    <Form
                        name="myForm"
                        onFinish={onFinish}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 6 }}
                    >
                        <Form.Item
                            label="Item"
                            initialValue="10"
                            name="selectedOption"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, selecione uma opção!',
                                },
                            ]}
                        >
                            <Select>
                                <Option value="10">10</Option>
                                <Option value="20">20</Option>
                                <Option value="30">30</Option>
                                <Option value="40">40</Option>
                                <Option value="50">50</Option>
                                <Option value="60">60</Option>
                            </Select>
                            <Space size={25}>
                                <Button className="ant-mb-4" type="primary" size='small' shape="circle" icon={<PlusOutlined />} />
                                <Button className="ant-mb-4" type="primary" size='small' shape="circle" danger icon={<MinusOutlined />} />
                            </Space>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Configuração de Item" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Entregas (Data Prep)" bordered={false}>
                    Card content
                </Card>
            </Col>
        </Row>
    );
};

export default BoxContent;