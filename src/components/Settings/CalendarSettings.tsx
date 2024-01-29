import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  LockOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Calendar,
  theme,
  Form,
  Input,
  Select,
  Tabs,
  Card,
  Row,
  Col,
  Radio,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  FloatButton,
  Modal,
  Tooltip,
  Space,
} from "antd";
import type { TabsProps } from "antd";
import CustomInputNumber from "components/CustomInputNumber";
import { useState } from "react";

const { TextArea } = Input;

export const CalendarSettings = () => {
  const [value, setValue] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setValue(value);
    setIsModalOpen(true);
  };

  const deleteDay = () => {
    Modal.confirm({
      title: "Excluir",
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o dia?",
      okText: "Confirmar",
      cancelText: "Cancelar",
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Form layout="vertical">
        <Row gutter={5}>
          <Col span={24} style={{ display: "flex" }}>
            <Card style={{ width: "100%" }} bodyStyle={{ padding: 10 }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <Button
                  type="primary"
                  icon={<FileAddOutlined />}
                  style={{ marginRight: 5 }}
                ></Button>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  style={{ marginRight: 5 }}
                ></Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  style={{ marginRight: 5 }}
                ></Button>
                <Button
                  type="primary"
                  icon={<CloseOutlined />}
                  style={{ marginRight: 5 }}
                ></Button>
                <Button type="primary" icon={<LockOutlined />}></Button>
              </div>
              <Form.Item
                label="Calendários"
                style={{
                  display: "inline-block",
                  width: "calc(25% - 8px)",
                  marginRight: 8,
                }}
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(25% - 8px)",
                  marginRight: "8px",
                }}
                label="Dias"
              >
                <Space.Compact style={{ width: "100%" }}>
                  <Tooltip title="Remover Item">
                    <Button type="primary" onClick={deleteDay}>
                      <MinusOutlined />
                    </Button>
                  </Tooltip>

                  <Select />
                  <Tooltip title="Adicionar Item">
                    <Button type="primary" onClick={openModal}>
                      <PlusOutlined />
                    </Button>
                  </Tooltip>
                </Space.Compact>
              </Form.Item>
              <Form.Item
                label="Nome"
                style={{ display: "inline-block", width: "50%" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Base"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  marginRight: 8,
                }}
              >
                <Select />
              </Form.Item>
              <Form.Item
                label="Descrição"
                style={{ display: "inline-block", width: "50%" }}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Obs" style={{ marginBottom: 0 }}>
                <TextArea style={{ resize: "none", height: "99px" }} />
              </Form.Item>
            </Card>
          </Col>
          <Col style={{ marginTop: 10 }} span={24}>
            <Card bodyStyle={{ padding: 0 }}>
              <Calendar fullscreen={false} value={value} />
            </Card>
          </Col>
        </Row>
      </Form>
      <Modal
        width={1200}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ marginTop: "10px" }} colon={false}>
          <Radio.Group style={{ display: "flex" }}>
            <Col span={12}>
              <Card title="Ocorrência">
                <Form.Item label={<Radio>Data</Radio>}>
                  <DatePicker />
                </Form.Item>
                <Form.Item label={<Radio>Baseado em</Radio>}>
                  <Select />
                  <CustomInputNumber size="small" min={0} max={50} />
                  <Select />
                  <Select />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Repetição">
                <Form.Item>
                  <Radio>Nunca</Radio>
                  <Radio>A cada</Radio>
                  <CustomInputNumber size="small" min={0} max={50} />
                  <Select />
                </Form.Item>
                <Divider orientation="left">Finalização</Divider>
                <Radio>Nunca</Radio>
                <Form.Item label={<Radio>Em</Radio>}>
                  <DatePicker />
                  <Radio>Após</Radio>
                  <CustomInputNumber />
                </Form.Item>
              </Card>
            </Col>
          </Radio.Group>
        </Form>
      </Modal>

      {/*<Form style={{ marginTop: "10px" }} colon={false}>
        <Radio.Group style={{ display: "flex" }}>
          <Col span={12}>
            <Card title="Ocorrência">
              <Form.Item label={<Radio>Data</Radio>}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={<Radio>Baseado em</Radio>}>
                <Select />
                <CustomInputNumber size="small" min={0} max={50} />
                <Select />
                <Select />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Repetição">
              <Form.Item>
                <Radio>Nunca</Radio>
                <Radio>A cada</Radio>
                <CustomInputNumber size="small" min={0} max={50} />
                <Select />
              </Form.Item>
              <Divider orientation="left">Finalização</Divider>
              <Radio>Nunca</Radio>
              <Form.Item label={<Radio>Em</Radio>}>
                <DatePicker />
                <Radio>Após</Radio>
                <CustomInputNumber />
              </Form.Item>
            </Card>
          </Col>
        </Radio.Group>
              </Form>

      <FloatButton.Group
        trigger="click"
        icon={<MenuOutlined />}
        style={{ right: 50, bottom: 90 }}
      >
       
      </FloatButton.Group>*/}
    </>
  );
};

export const Maintenance = () => {
  return <div> Manutenção </div>;
};

export const PageTabs = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Calendário",
    children: <CalendarSettings />,
  },
  {
    key: "2",
    label: "Manutenção",
    children: <Maintenance />,
  },
];
