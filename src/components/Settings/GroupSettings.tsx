import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  TimePicker,
} from "antd";

import React, { useState } from "react";
import { formStyle } from "./Style";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";

const { TextArea } = Input;

const GroupSettings: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15}}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type="Grupo"
          value={value}
        />
      </div>
      <Form layout="vertical">
        <div>
          <Row gutter={10}>
            <Col span={12}>
              <Card title="Definição" bodyStyle={{ padding: 10 }}>
                <Form.Item label="Nome" style={formStyle("100%")}>
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
        </div>
      </Form>
      <div style={{ margin: 10, float: "right" }}>
        <DeleteButton />
        <SaveButton />
      </div>
    </>
  );
};

export default GroupSettings;
