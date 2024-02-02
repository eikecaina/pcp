import {
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";

import React from "react";
import { formStyle } from "./Style";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

const { TextArea } = Input;

const GroupSettings: React.FC = () => {
  return (
    <>
      <Form layout="vertical">
        <Row gutter={10}>
          <Col span={12}>
            <Card title="Definição" bodyStyle={{ padding: 10 }}>
              <Form.Item
                label="Tipo"
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <Select
                  options={[
                    { value: "Tranformador a Seco" },
                    { value: "Tranformador de Distribuição" },
                    { value: "Tranformador de Meia Força" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Nome" style={formStyle("50%")}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" style={formStyle("100%")}>
                <Input />
              </Form.Item>
              <Form.Item label="Descrição" style={{ marginBottom: 20 }}>
                <TextArea style={{ resize: "none", height: "150px" }} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            
            <Card title="Bloqueio Temporario" bodyStyle={{ padding: 10 }}>
              <Form.Item label="Estado">
                <Select
                  options={[{ value: "Ativo" }, { value: "Bloqueado" }]}
                />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(50% - 8px)", "8px")}
                label="Desbloqueio"
              >
                <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label=" " style={formStyle("50%")}>
                <TimePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Avisos" style={{ marginBottom: 20 }}>
                <TextArea style={{ resize: "none", height: "150px" }} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
      <div style={{ margin: 10, float: "right" }}>
        <NewButton />
        <EditButton />
        <DeleteButton />
        <SaveButton />
      </div>
    </>
  );
};

export default GroupSettings;
