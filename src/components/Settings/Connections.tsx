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
  return (
    <>
      <Form.Item style={{ width: "25%" }} label="Processo">
        <Select />
      </Form.Item>
      <Row gutter={10}>
        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title="Entrada">
            <div style={{ marginTop: 5, width: "100%" }}>
              <RadioButtons value={value} onChange={onChange} />
            </div>
            <Form disabled={value === 1} layout="vertical">
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
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title="Saída">
            <div style={{ marginTop: 5, width: "100%" }}>
              <RadioButtons value={exitValue} onChange={onChangeExit} />
            </div>
            <Form disabled={exitValue === 1} layout="vertical">
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
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Ligação de Entrada"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >
        <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
          <div style={{ marginRight: 15 }}>
            <RadioButtons
              value={valueModal}
              onChange={onChangeModal}
              type="Regras"
            />
          </div>
          <SelectRadio
            style={formStyle("calc(40% - 2px)", "6px")}
            value={valueModal}
            type="Regras"
          />
          <Form.Item label="Regra" style={formStyle("40%")}>
            <Input disabled={valueModal === 2} />
          </Form.Item>
        </div>
        <Row gutter={10}>
          <Col span={12}>
            <Card title="Condições de entrada" bodyStyle={{ padding: 10 }}>
              <Radio.Group
                onChange={onChangeRadioModal}
                value={valueRadioModal}
              >
                <Form.Item>
                  <Radio value={1}>Nenhuma</Radio>
                </Form.Item>
                <Form.Item>
                  <Radio value={2}>
                    Finalização do processo{" "}
                    <DatePicker
                      disabled={valueRadioModal === 1}
                      format={"DD/MM/YYYY"}
                    />
                  </Radio>
                </Form.Item>
              </Radio.Group>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Ações de saída" bodyStyle={{ padding: 10 }}>
              <Form.Item>
                <Checkbox>
                  Inico
                  <DatePicker style={{ marginLeft: 10 }} showTime />
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>Dias corridos</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Ligação de Saída"
        open={isModalExitOpen}
        onOk={handleOkExit}
        onCancel={handleCancelExit}
        width={850}
      >
        <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
          <div style={{ marginRight: 15 }}>
            <RadioButtons
              value={valueModal}
              onChange={onChangeModal}
              type="Regras"
            />
          </div>
          <SelectRadio
            style={formStyle("calc(40% - 2px)", "6px")}
            value={valueModal}
            type="Regras"
          />
          <Form.Item label="Regra" style={formStyle("40%")}>
            <Input disabled={valueModal === 2} />
          </Form.Item>
        </div>
        <Row gutter={10}>
          <Col span={12}>
            <Card title="Condições de entrada" bodyStyle={{ padding: 10 }}>
              <Radio.Group
                onChange={onChangeRadioModal}
                value={valueRadioModal}
              >
                <Form.Item>
                  <Radio value={1}>Nenhuma</Radio>
                </Form.Item>
                <Form.Item>
                  <Radio value={2}>
                    Finalização do processo
                    <DatePicker
                      disabled={valueRadioModal === 1}
                      format={"DD/MM/YYYY"}
                    />
                  </Radio>
                </Form.Item>
              </Radio.Group>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Ações de saída" bodyStyle={{ padding: 10 }}>
              <Form.Item>
                <Checkbox>
                  Inico
                  <DatePicker style={{ marginLeft: 10 }} showTime />
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>Dias corridos</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};