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
} from "antd";
import React, { useState } from "react";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "next-i18next";

export const Connections: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const [valueRadioModal, setValueRadioModal] = useState(1);

  const onChangeRadioModal = (e: RadioChangeEvent) => {
    setValueRadioModal(e.target.value);
  };
  const [valueModal, setValueModal] = useState(1);

  const onChangeModal = (e: RadioChangeEvent) => {
    setValueModal(e.target.value);
  };
  const [exitValue, setExitValue] = useState(1);

  const onChangeExit = (e: RadioChangeEvent) => {
    setExitValue(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const showModalExit = () => {
    setIsModalExitOpen(true);
  };

  const handleOkExit = () => {
    setIsModalExitOpen(false);
  };

  const handleCancelExit = () => {
    setIsModalExitOpen(false);
  };

  const { t } = useTranslation("layout");
  return (
    <>
      <Form.Item style={{ width: "25%" }} label={t("labels.process")}>
        <Select />
      </Form.Item>
      <Row gutter={10}>
        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.entry")}>
            <div style={{ marginTop: 5, width: "100%" }}>
              <RadioButtons value={value} onChange={onChange} />
            </div>
            <Form layout="vertical">
              <Form.Item
                label={t("labels.entryProcess")}
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <Select />
              </Form.Item>
              <Form.Item label={t("labels.outputProcess")} style={formStyle("50%")}>
                <Select />
              </Form.Item>
              <Form.Item
                label={t("labels.time")}
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <CustomInputNumber style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
              <Form.Item label=" " style={formStyle("calc(20% - 5px)", "5px")}>
                <Select />
              </Form.Item>
              <Form.Item label={t("labels.type")} style={formStyle("60%")}>
                <Select />
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button onClick={showModal} type="primary">
                  {t("labels.rules")}
                </Button>
              </Form.Item>
              <div style={{ float: "right" }}>
                <SaveButton />
                <DeleteButton />
              </div>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.output")}>
            <div style={{ marginTop: 5, width: "100%" }}>
              <RadioButtons value={exitValue} onChange={onChangeExit} />
            </div>
            <Form layout="vertical">
              <Form.Item
                label={t("labels.entryProcess")}
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <Select />
              </Form.Item>
              <Form.Item label={t("labels.outputProcess")} style={formStyle("50%")}>
                <Select />
              </Form.Item>
              <Form.Item
                label={t("labels.time")}
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <CustomInputNumber style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
              <Form.Item label=" " style={formStyle("calc(20% - 5px)", "5px")}>
                <Select />
              </Form.Item>
              <Form.Item label={t("labels.type")} style={formStyle("60%")}>
                <Select />
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button onClick={showModalExit} type="primary">
                  {t("labels.rules")}
                </Button>
              </Form.Item>
              <div style={{ float: "right" }}>
                <SaveButton />
                <DeleteButton />
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
          <Form.Item label={t("labels.rules")} style={formStyle("calc(40% - 2px)", "6px")}>
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
          <Form.Item label={t("labels.rules")} style={formStyle("calc(40% - 2px)", "6px")}>
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
