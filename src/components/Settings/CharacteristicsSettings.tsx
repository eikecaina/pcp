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
import { useTranslation } from "next-i18next";

const { TextArea } = Input;

const CharacteristicsSettings: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const { t } = useTranslation("layout");
  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type={t("labels.group")}
          value={value}
        />
      </div>
      <Form layout="vertical">
        <div>
          <Row gutter={5}>
            <Col span={24}>
              <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
                <Form.Item
                  label={t("labels.name")}
                  style={formStyle("calc(28.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("labels.exhibition")}
                  style={formStyle("calc(28.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("labels.position")}
                  style={formStyle("calc(15% - 8px)", "8px")}
                >
                  <CustomInputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label={t("labels.type")} style={formStyle("28.33%")}>
                  <Select
                    options={[{ value: "Linha" }, { value: "Produto" }]}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.description")}
                  style={formStyle("100%")}
                >
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
