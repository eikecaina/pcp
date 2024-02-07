import { Card, Col, Form, Input, RadioChangeEvent, Row, Select } from "antd";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useState } from "react";

const { TextArea } = Input;

const CharacteristicsSettings: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type="Grupo"
          value={value}
        />
      </div>
      <Form layout="vertical">
        <div>
          <Row gutter={5}>
            <Col span={24}>
              <Card title="Definição" bodyStyle={{ padding: 10 }}>
                <Form.Item
                  label="Nome"
                  style={formStyle("calc(28.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Exibição"
                  style={formStyle("calc(28.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Posição"
                  style={formStyle("calc(15% - 8px)", "8px")}
                >
                  <CustomInputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Tipo" style={formStyle("28.33%")}>
                  <Select
                    options={[{ value: "Linha" }, { value: "Produto" }]}
                  />
                </Form.Item>
                <Form.Item label="Descrição" style={formStyle("100%")}>
                  <TextArea style={{ height: 150, resize: "none" }} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ margin: 10, float: "right" }}>
          <DeleteButton />
          <SaveButton />
        </div>
      </Form>
    </>
  );
};

export default CharacteristicsSettings;
