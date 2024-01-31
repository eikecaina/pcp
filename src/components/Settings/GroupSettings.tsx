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
import ButtonsComponent from "./ButtonsComponent";
import React from "react";
import { formStyle } from "./Style";

const { TextArea } = Input;

const GroupSettings: React.FC = () => {
  return (
    <>
      <Card bodyStyle={{ padding: 0 }}>
        <div style={{ margin: 10 }}>
          <ButtonsComponent new={true} edit={true} delete={true} save={true} />
        </div>
        <Form layout="vertical">
          <Row gutter={10}>
            <Col span={12}>
              <Divider orientation="left">Definição</Divider>

              <div style={{ margin: 10 }}>
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
              </div>
            </Col>
            <Col span={12}>
              <Divider orientation="left">Bloqueio Temporario</Divider>
              <div style={{ margin: 10 }}>
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
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default GroupSettings;
