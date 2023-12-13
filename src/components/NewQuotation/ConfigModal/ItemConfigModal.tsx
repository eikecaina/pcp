import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Modal,
  Radio,
  Row,
  Space,
} from "antd";
import CustomInputNumber from "components/CustomInputNumber";
import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export const ItemConfigModal: React.FC = () => {
  const [disabelInput, setDisabelInput] = useState(1);
  const [repMaterial, setRepMaterial] = useState(false);

  return (
    <Card title="Configuração de item" style={{ height: "100%" }}>
      <Radio.Group
        onChange={(e) => setDisabelInput(e.target.value)}
        value={disabelInput}
      >
        <Space direction="vertical" style={{ marginBottom: 20 }}>
          <Radio value={1}>Certificado</Radio>
          <Radio value={2}>Aprovação em dias corridos</Radio>
        </Space>
      </Radio.Group>
      <Form layout="vertical">
        <Form.Item label="Dias">
          <CustomInputNumber
            disabled={disabelInput !== 2}
            min={0}
            maxLength={3}
            style={{ width: 50 }}
          />
        </Form.Item>
        <Form.Item label="Número do Claim">
          <CustomInputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Número do novo material">
          <CustomInputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={
            <Checkbox
              checked={repMaterial}
              onChange={(e) => setRepMaterial(e.target.checked)}
            >
              Repetição do material
            </Checkbox>
          }
        >
          <CustomInputNumber
            disabled={!repMaterial}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export const DeliveryModal: React.FC = () => {
  const confirmDelete = () => {
    Modal.confirm({
      title: "Excluir?",
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Item?",
      okText: "Confirmar",
      cancelText: "Cancelar",
    });
  };

  const listDates = () => {
    const datasExample = [
      { data: "24/02/2024", peça: 1 },
      { data: "22/04/2024", peça: 3 },
      { data: "21/07/2024", peça: 6 },
      { data: "26/09/2024", peça: 7 },
      { data: "28/01/2024", peça: 8 },
      { data: "21/07/2024", peça: 3 },
      { data: "21/07/2024", peça: 2 },
      { data: "22/07/2024", peça: 4 },
      { data: "23/07/2024", peça: 1 },
      { data: "25/07/2024", peça: 10 },
    ];

    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {datasExample.map((item, index) => (
          <li
            style={{
              marginBottom: 3,
              background: index % 2 === 0 ? "white" : "#f0f0f0",
              padding: 2,
            }}
            key={index}
          >
            {item.data + " - " + item.peça + " peças"}
          </li>
        ))}
      </ul>
    );
  };

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  dayjs.extend(customParseFormat);

  return (
    <Card title="Entrega">
      <Form.Item label="Entrega em">
        <DatePicker
          style={{ width: "100%" }}
          defaultValue={dayjs("00/00/0000", dateFormatList[0])}
          format={dateFormatList}
        />
      </Form.Item>
      <Form.Item
        label="Quantidade"
        rules={[{ required: true, message: "Por favor, selecione o Item!" }]}
      >
        <CustomInputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Row style={{ justifyContent: "space-evenly" }}>
        <Button
          type="primary"
          style={{
            width: "40%",
            backgroundColor: "#95de64",
          }}
        >
          Salvar
        </Button>
        <Button
          style={{
            width: "40%",
          }}
          onClick={confirmDelete}
          type="primary"
        >
          Limpar
        </Button>
      </Row>
      <Card
        style={{
          marginTop: 15,
          overflowY: "auto",
          height: "100%",
          maxHeight: 257,
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: 0, margin: 0 }}
      >
        {listDates()}
      </Card>
    </Card>
  );
};
