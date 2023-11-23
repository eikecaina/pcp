import { Card, Col, Form, Row, Button, Select, Space, Input, Modal, Radio, message, Collapse, RadioChangeEvent, FloatButton, TourProps, Tour } from 'antd';
import { ExclamationCircleOutlined, FileOutlined, PrinterOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';

const { Panel } = Collapse;

const successMsg = () => {
    message.success('Item Criado');
};

const excludeMsg = () => {
    message.error('Item Excluido')
};

const configItem = () => {
    Modal.confirm({
        title: 'Configuração de Item',
        content:
            <>
                <Radio.Group>
                    <Space direction='vertical'>
                        <Radio value={1}>Certificado</Radio>
                        <Radio value={2}>Aprovação em</Radio>
                    </Space>
                </Radio.Group>
            </>
        ,
        okText: 'Confirmar',
        cancelText: 'Cancelar',
    });
}

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

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const refs = [useRef(null), useRef(null), useRef(null)];

    const [open, setOpen] = useState<boolean>(false);

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

        <Card title="Dados gerais Cotação">
            <Row gutter={20}>
                <Col span={12}>

                    <Form>
                        <Row gutter={[16, 16]} align="middle">
                            <Col span={24}>
                                <Form.Item
                                    label="Item"
                                    name="item"
                                    rules={[{ required: true, message: 'Por favor, selecione o Item!' }]}
                                >
                                    <Select defaultValue={10} options={[
                                        { value: '10' },
                                        { value: '20' },
                                        { value: '30' },
                                        { value: '40' },
                                        { value: '50' },
                                        { value: '60' },
                                    ]}
                                        style={{ width: '100%' }}
                                    >

                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8} push={1}>
                                <Form.Item>
                                    <Button ref={refs[0]} type="primary" onClick={successMsg} style={{ backgroundColor: '#95de64' }}>
                                        Novo Item
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={10} push={1}>
                                <Form.Item>
                                    <Button ref={refs[1]} type="primary" onClick={configItem} style={{ backgroundColor: '#bfbfbf' }}>
                                        Configuração
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item>
                                    <Button ref={refs[2]} onClick={confirmDelete} type="primary">
                                        Excluir Item
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]} align="middle">
                            <Col span={12}>
                                <Form.Item
                                    label="Cotação"
                                    name="cotacao"
                                    rules={[{ required: true, message: 'Por favor, insira a Cotação!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="ODV"
                                    name="odv"
                                    rules={[{ required: true, message: 'Por favor, insira o ODV!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]} align="middle">
                            <Col span={24}>
                                <Form.Item
                                    label="Cliente"
                                    name="cliente"
                                    rules={[{ required: true, message: 'Por favor, insira o Cliente!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={8}></Col>
                <Col span={12}>
                    <Row>
                        <Collapse style={{ width: '100%'}} >
                            <Panel key={'1'} header={'Meio de operação'}>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={1}>Óleo</Radio>
                                    <Radio value={2}>Seco</Radio>
                                </Radio.Group>
                            </Panel>
                            <Panel key={'2'} header={'Potência (kVA)'}>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={3}>1000</Radio>
                                    <Radio value={4}>2000</Radio>
                                    <Radio value={5}>3000</Radio>
                                    <Radio value={6}>4000</Radio>
                                    <Radio value={7}>5000</Radio>
                                    <Radio value={8}>6000</Radio>
                                    <Radio value={9}>7000</Radio>
                                    <Radio value={10}>8000</Radio>
                                    <Radio value={11}>9000</Radio>
                                    <Radio value={12}>10000</Radio>
                                </Radio.Group>
                            </Panel>
                            <Panel key={'3'} header={'Classe de tensão (kV)'}>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={13}>0 - 15</Radio>
                                    <Radio value={14}>15 - 25</Radio>
                                </Radio.Group>
                            </Panel>
                        </Collapse>
                    </Row>
                </Col>
            </Row>
            <FloatButton
                shape="circle"
                type="primary"
                style={{ right: 50, top: 820 }}
                icon={<PrinterOutlined />}
            />
            <FloatButton
                onClick={() => setOpen(true)}
                shape="circle"
                type="primary"
                style={{ right: 100, top: 820, }}
                icon={<FileOutlined />}
            />
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </Card>
    )
}


export default ItensConfig
