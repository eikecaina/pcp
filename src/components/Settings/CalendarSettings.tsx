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
import type { RadioChangeEvent, TabsProps } from "antd";
import CustomInputNumber from "components/CustomInputNumber";
import dayjs from "dayjs";
import { useState } from "react";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "next-i18next";

const { TextArea } = Input;

export const CalendarSettings = () => {
  const [value, setValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setValue(value);
    setIsModalOpen(true);
  };

  const deleteDay = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: t("labels.deleteDays"),
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
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

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const {t} = useTranslation("layout");

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type={t("labels.calendar")}
          value={value}
        />
      </div>
      <Form layout="vertical">
        <Row gutter={5}>
          <Col span={18} style={{ display: "flex" }}>
            <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
              <div style={{ margin: 10 }}>
                <Form.Item
                  style={formStyle("calc(40% - 8px)", "8px")}
                  label={t("labels.days")}
                >
                  <Space.Compact style={{ width: "100%" }}>
                    <Tooltip title={t("labels.removeDays")}>
                      <Button type="primary" onClick={deleteDay}>
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>

                    <Select
                      defaultValue="Ferias"
                      options={[{ value: "Ferias" }]}
                    />

                    <Tooltip title={t("labels.editDays")}>
                      <Button type="primary" onClick={openModal}>
                        <EditOutlined />
                      </Button>
                    </Tooltip>
                  </Space.Compact>
                </Form.Item>
                <Form.Item label=" " style={formStyle("5%")}>
                  <Tooltip title={t("labels.addDays")}>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={openModal}
                      type="primary"
                    ></Button>
                  </Tooltip>
                </Form.Item>

                <Form.Item label={t("labels.name")} style={formStyle("55%")}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Base"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
                <Form.Item label={t("labels.description")} style={formStyle("50%")}>
                  <Input />
                </Form.Item>
                <Form.Item label={t("labels.comments")} style={{ marginBottom: 0 }}>
                  <TextArea style={{ resize: "none", height: "99px" }} />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: 325 }} bodyStyle={{ padding: 0 }}>
              <Calendar fullscreen={false} style={{ color: "red" }} />
            </Card>
          </Col>
        </Row>
        <div style={{ margin: 10, float: "right" }}>
          <SaveButton />
        </div>
      </Form>
      <Modal
        width={1400}
        title={t("titles.settingsDay")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ marginTop: "10px" }} colon={false}>
          <div style={{ display: "flex" }}>
            <Col span={9}>
              <Card title={t("titles.occurrence")} bodyStyle={{ padding: 10 }}>
                <div style={{ width: "100%" }}>
                  <Form.Item label={t("labels.name")}>
                    <Input size="small" />
                  </Form.Item>
                  <Form.Item
                    label={t("lables.date")}
                    style={formStyle("calc(70% - 5px)", "5px")}
                  >
                    <DatePicker
                      size="small"
                      defaultValue={dayjs()}
                      format={"DD/MM/YYYY"}
                      style={formStyle("80%")}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t("labels.elapsedDays")}
                    style={formStyle("calc(23% - 8px)", "8px")}
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title={t("labels.repeat")} bodyStyle={{ padding: 10 }}>
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
            <Col span={9}>
              <Card title={t("labels.termination")} bodyStyle={{ padding: 10 }}>
                <Form.Item style={formStyle("100%")} label="Nunca">
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(50% - 6px)", "6px")}
                  label={t("labels.in")}
                >
                  <DatePicker format={"DD/MM/YYYY"} size="small" />
                </Form.Item>
                <Form.Item label={t("labels.after")} style={formStyle("50%")}>
                  <CustomInputNumber
                    size="small"
                    min={1}
                    style={formStyle("40%", "8px")}
                  />
                  {t("labels.occurrences")}
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
