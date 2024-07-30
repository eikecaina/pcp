import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  message,
} from "antd";
import React, { useState } from "react";
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Delete, Save, Update } from "@/app/api/services/Connection/data";

export const Connections: React.FC = () => {
  const [valueEntry, setValueEntry] = useState(2);
  const [valueOutput, setValueOutput] = useState(2);
  const [formData, setFormData] = useState<any>({});
  const [fetchData, setFetchData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const clearInputs = () => {
    setFormData({});
  };

  const success = async () => {
    try {
      if (formData.id) {
        await Update(formData);
      } else {
        await Save(formData);
      }
      clearInputs();
      setFetchData(true);
      message.success("Salvo com sucesso!");
    } catch (error) {
      message.error("Não foi possível salvar");
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Valor?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await Delete(formData);
          clearInputs();
          setFetchData(true);
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalExit = () => {
    setIsModalExitOpen(true);
  };

  const handleOkExit = () => {
    setIsModalExitOpen(false);
  };

  const handleCancelExit = () => {
    setIsModalExitOpen(false);
  };

  const newFunctionEntry = () => {
    setValueEntry(1);
    clearInputs();
  };

  const editFunctionEntry = () => {
    setValueEntry(3);
  };

  const newFunctionOutput = () => {
    setValueOutput(1);
    clearInputs();
  };

  const editFunctionOutput = () => {
    setValueOutput(3);
  };

  const { t } = useTranslation("layout");
  return (
    <>
      <Form.Item
        style={{ width: "25%" }}
        label={t("labels.process") + " Ligação"}
      >
        <Select />
      </Form.Item>
      <Row gutter={10}>
        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.entry")}>
            <Form layout="vertical">
              <Form.Item
                label={t("labels.process")}
                style={formStyle("calc(100%)")}
              >
                <Select disabled={valueEntry === 1} />
              </Form.Item>

              <Form.Item
                label={t("labels.time")}
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <CustomInputNumber disabled={valueEntry === 1} style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
              <Form.Item label=" " style={formStyle("calc(20% - 5px)", "5px")}>
                <Select disabled={valueEntry === 1} />
              </Form.Item>
              <Form.Item label={t("labels.type")} style={formStyle("60%")}>
                <Select disabled={valueEntry === 1} />
              </Form.Item>
              <Form.Item>
                <Checkbox disabled={valueEntry === 1}>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button disabled onClick={showModal} type="primary">
                  {t("labels.rules")}
                </Button>
              </Form.Item>
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={newFunctionEntry} />
                <EditButton onClick={editFunctionEntry} />
                <DeleteButton onClick={confirmDelete} />
                <SaveButton onClick={success} />
              </div>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.output")}>
            <Form layout="vertical">
              <Form.Item label={t("labels.process")} style={formStyle("100%")}>
                <Select disabled={valueOutput === 1}/>
              </Form.Item>
              <Form.Item
                label={t("labels.time")}
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <CustomInputNumber disabled={valueOutput === 1} style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
              <Form.Item label=" " style={formStyle("calc(20% - 5px)", "5px")}>
                <Select disabled={valueOutput === 1} />
              </Form.Item>
              <Form.Item label={t("labels.type")} style={formStyle("60%")}>
                <Select disabled={valueOutput === 1} />
              </Form.Item>
              <Form.Item>
                <Checkbox disabled={valueOutput === 1}>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button disabled onClick={showModalExit} type="primary">
                  {t("labels.rules")}
                </Button>
              </Form.Item>
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={newFunctionOutput} />
                <EditButton onClick={editFunctionOutput} />
                <DeleteButton onClick={confirmDelete} />
                <SaveButton onClick={success} />
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal
        title={t("titles.entryCondition")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >
        <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
          <div style={{ marginRight: 15 }}>
            <Button type="primary">{t("generalButtons.newButton")}</Button>
          </div>
          <Form.Item
            label={t("labels.rules")}
            style={formStyle("calc(40% - 2px)", "6px")}
          >
            <Select />
          </Form.Item>
        </div>
        <Row gutter={10}>
          <Col span={12}>
            <Card title={t("titles.entryAction")} bodyStyle={{ padding: 10 }}>
              <div>
                <Form.Item>
                  <Radio value={1}>{t("labels.none")}</Radio>
                </Form.Item>
                <Form.Item>
                  <Radio value={2}>
                    {t("labels.completionProcess")}
                    <DatePicker
                      style={{ marginLeft: 10 }}
                      format={"DD/MM/YYYY"}
                    />
                  </Radio>
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("titles.exitAction")} bodyStyle={{ padding: 10 }}>
              <Form.Item>
                <Checkbox>
                  {t("labels.start")}
                  <DatePicker
                    style={{ marginLeft: 10 }}
                    format={"DD/MM/YYYY"}
                    showTime
                  />
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={t("labels.outputCondition")}
        open={isModalExitOpen}
        onOk={handleOkExit}
        onCancel={handleCancelExit}
        width={850}
      >
        <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
          <div style={{ marginRight: 15 }}>
            <Button type="primary">{t("generalButtons.newButton")}</Button>
          </div>
          <Form.Item
            label={t("labels.rules")}
            style={formStyle("calc(40% - 2px)", "6px")}
          >
            <Select />
          </Form.Item>
        </div>
        <Row gutter={10}>
          <Col span={12}>
            <Card title={t("titles.entryAction")} bodyStyle={{ padding: 10 }}>
              <div>
                <Form.Item>
                  <Radio value={1}>{t("labels.none")}</Radio>
                </Form.Item>
                <Form.Item>
                  <Radio value={2}>
                    {t("labels.completionProcess")}
                    <DatePicker
                      style={{ marginLeft: 10 }}
                      format={"DD/MM/YYYY"}
                    />
                  </Radio>
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("titles.exitAction")} bodyStyle={{ padding: 10 }}>
              <Form.Item>
                <Checkbox>
                  {t("labels.start")}
                  <DatePicker style={{ marginLeft: 10 }} showTime />
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
