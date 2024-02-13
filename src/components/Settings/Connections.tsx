import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
import { DeleteButton, RadioButtons, SaveButton } from "./ButtonsComponent";
import { formStyle } from "./Style";

export const Connections: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
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
  return (
    <>
      <Form.Item style={{ width: "25%" }} label="Processo">
        <Select />
      </Form.Item>
      <Row gutter={10}>
        <Col span={12}>
          <Form layout="vertical">
            <Card bodyStyle={{ padding: 10 }} title="Entrada">
              <div style={{ marginTop: 5, width: "100%" }}>
                <RadioButtons value={value} onChange={onChange} />
              </div>
              <Form.Item
                label="Processo Entrada"
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <Select />
              </Form.Item>
              <Form.Item label="Processo Saída" style={formStyle("50%")}>
                <Select />
              </Form.Item>
              <Form.Item
                label="Tempo"
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format={"DD/MM/YYYY HH:mm:ss"}
                />
              </Form.Item>
              <Form.Item label="Tipo" style={formStyle("50%")}>
                <Select />
              </Form.Item>
              <Form.Item>
                <Checkbox>Dias Corridos</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button onClick={showModal} type="primary">
                  Regras
                </Button>
              </Form.Item>
              <div style={{ float: "right" }}>
                <SaveButton />
                <DeleteButton />
              </div>
            </Card>
          </Form>
        </Col>

        <Col span={12}>
          <Form layout="vertical">
            <Card bodyStyle={{ padding: 10 }} title="Saída">
              <div style={{ marginTop: 5, width: "100%" }}>
                <RadioButtons value={exitValue} onChange={onChangeExit} />
              </div>
              <Form.Item
                label="Processo Entrada"
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <Select />
              </Form.Item>
              <Form.Item label="Processo Saída" style={formStyle("50%")}>
                <Select />
              </Form.Item>
              <Form.Item
                label="Tempo"
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format={"DD/MM/YYYY HH:mm:ss"}
                />
              </Form.Item>
              <Form.Item label="Tipo" style={formStyle("50%")}>
                <Select />
              </Form.Item>
              <Form.Item>
                <Checkbox>Dias Corridos</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button onClick={showModalExit} type="primary">
                  Regras
                </Button>
              </Form.Item>
              <div style={{ float: "right" }}>
                <SaveButton />
                <DeleteButton />
              </div>
            </Card>
          </Form>
        </Col>
      </Row>
      <Modal
        title="Ligação de Entrada"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item label="Regras">
          <Select />
        </Form.Item>
        <Radio.Group>

        </Radio.Group>
      </Modal>
      <Modal
        title="Ligação de Saída"
        open={isModalExitOpen}
        onOk={handleOkExit}
        onCancel={handleCancelExit}
      ></Modal>
    </>
  );
};
