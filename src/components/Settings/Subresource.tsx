import { Card, DatePicker, Form, RadioChangeEvent, Select } from "antd";
import React, { useState } from "react";
import { DeleteButton, RadioButtons, SaveButton } from "./ButtonsComponent";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "react-i18next";

const SubResource: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const { t } = useTranslation("layout");

  return (
    <>
      <RadioButtons value={value} onChange={onChange} />
      <Card bodyStyle={{ padding: 10 }}>
        <Form layout="vertical">
          <Form.Item style={formStyle("calc(50% - 5px", "5px")} label={t("labels.resource")}>
            <Select disabled={value === 1} />
          </Form.Item>
          <Form.Item style={formStyle("calc(50% - 5px", "5px")} label={t("labels.family")}>
            <Select disabled={value === 1} />
          </Form.Item>
          <Form.Item
            style={formStyle("calc(33.33% - 5px", "5px")}
            label={t("labels.subResource")}
          >
            <Select disabled={value === 2} />
          </Form.Item>
          <Form.Item label={t("labels.time")} style={formStyle("calc(10% - 5px)", "5px")}>
            <CustomInputNumber style={{ width: "100%" }} placeholder="0" />
          </Form.Item>
          <Form.Item label=" " style={formStyle("calc(10% - 6px)", "11px")}>
            <Select />
          </Form.Item>
          <Form.Item style={formStyle("46%")} label={t("labels.realese")}>
            <DatePicker
              disabled={value === 2}
              style={{ width: "100%" }}
              showTime
              format={"DD/MM/YYYY HH:mm:ss"}
            />
          </Form.Item>
          <div style={{ float: "right" }}>
            <SaveButton />
            <DeleteButton />
          </div>
        </Form>
      </Card>
    </>
  );
};

export default SubResource;
