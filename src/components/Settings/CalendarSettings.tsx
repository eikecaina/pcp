import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Calendar,
  Form,
  Input,
  Select,
  Tabs,
  Card,
  Row,
  Col,
  Checkbox,
  DatePicker,
  Modal,
  Tooltip,
  Space,
} from "antd";
import type { TabsProps } from "antd";
import CustomInputNumber from "components/CustomInputNumber";
import dayjs from "dayjs";
import { useState } from "react";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

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

  const formStyle = (
    width: string,
    marginRight?: string
  ): React.CSSProperties => ({
    display: "inline-block",
    width: width,
    marginRight: marginRight,
  });

  return (
    <>
      <Form layout="vertical">
        <Row gutter={5}>
          <Col span={18} style={{ display: "flex" }}>
            <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
              <div style={{ margin: 10 }}>
                <Form.Item
                  label="Calendários"
                  style={formStyle("calc(25% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(25% - 8px)", "8px")}
                  label="Dias"
                >
                  <Space.Compact style={{ width: "100%" }}>
                    <Tooltip title="Remover Dia">
                      <Button type="primary" onClick={deleteDay}>
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>

                    <Select
                      defaultValue="Ferias"
                      options={[{ value: "Ferias" }]}
                    />

                    <Tooltip title="Editar Dia">
                      <Button type="primary" onClick={openModal}>
                        <EditOutlined />
                      </Button>
                    </Tooltip>
                  </Space.Compact>
                </Form.Item>
                <Form.Item label="Nome" style={formStyle("50%")}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Base"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
                <Form.Item label="Descrição" style={formStyle("50%")}>
                  <Input />
                </Form.Item>
                <Form.Item label="Obs" style={{ marginBottom: 0 }}>
                  <TextArea style={{ resize: "none", height: "99px" }} />
                </Form.Item>
              </div>
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={openModal} />
                <SaveButton />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: 375 }} bodyStyle={{ padding: 0 }}>
              <Calendar
                fullscreen={false}
                value={value}
                style={{ color: "red" }}
              />
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
          <div style={{ display: "flex" }}>
            <Col span={8}>
              <Card title="Ocorrência" bodyStyle={{ padding: 10 }}>
                <div style={{ width: "100%" }}>
                  <Form.Item label="Nome">
                    <Input size="small" />
                  </Form.Item>
                  <Form.Item
                    label="Data"
                    style={formStyle("calc(78% - 5px)", "5px")}
                  >
                    <DatePicker
                      size="small"
                      defaultValue={dayjs()}
                      format={"DD/MM/YYYY"}
                      style={formStyle("80%")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Dia util"
                    style={formStyle("calc(20% - 8px)", "8px")}
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Repetição" bodyStyle={{ padding: 10 }}>
                <Form.Item style={formStyle("100%")} label="Nunca">
                  <Checkbox />
                </Form.Item>
                <Form.Item style={formStyle("65%")} label="A cada">
                  <CustomInputNumber
                    defaultValue={1}
                    min={1}
                    size="small"
                    style={formStyle("calc(45% - 8px)", "8px")}
                  />
                  <Select
                    defaultValue={"Dia"}
                    options={[
                      { value: "Dia" },
                      { value: "Semana" },
                      { value: "Mês" },
                      { value: "Ano" },
                    ]}
                    style={formStyle("55%")}
                    size="small"
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Término" bodyStyle={{ padding: 10 }}>
                <Form.Item style={formStyle("100%")} label="Nunca">
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(50% - 6px)", "6px")}
                  label="Em"
                >
                  <DatePicker format={"DD/MM/YYYY"} size="small" />
                </Form.Item>
                <Form.Item label="Após" style={formStyle("50%")}>
                  <CustomInputNumber
                    size="small"
                    min={1}
                    style={formStyle("40%", "8px")}
                  />
                  ocorrências
                </Form.Item>
              </Card>
            </Col>
          </div>
        </Form>
      </Modal>
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
