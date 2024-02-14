import { Card, DatePicker, Form, RadioChangeEvent, Select } from "antd";
import React, { useState } from "react";
import { DeleteButton, RadioButtons, SaveButton } from "./ButtonsComponent";
import { formStyle } from "./Style";

const SubResource: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <>
      <RadioButtons value={value} onChange={onChange} />
      <Card bodyStyle={{ padding: 10 }}>
        <Form layout="vertical">
          <Form.Item style={formStyle("calc(50% - 5px", "5px")} label="Recurso">
            <Select disabled={value === 1}/>
          </Form.Item>
          <Form.Item style={formStyle("calc(50% - 5px", "5px")} label="Família">
            <Select disabled={value === 1} />
          </Form.Item>
          <Form.Item
            style={formStyle("calc(33.33% - 5px", "5px")}
            label="Sub-Recurso"
          >
            <Select disabled={value === 2} />
          </Form.Item>
          <Form.Item
            style={formStyle("calc(33.33% - 5px", "5px")}
            label="Preparo"
          >
            <DatePicker
            disabled={value === 2}
              style={{ width: "100%" }}
              showTime
              format={"DD/MM/YYYY HH:mm:ss"}
            />
          </Form.Item>
          <Form.Item
            style={formStyle("calc(33.33% - 5px", "5px")}
            label="Liberação"
          >
            <DatePicker
            disabled={value === 2}
              style={{ width: "100%" }}
              showTime
              format={"DD/MM/YYYY HH:mm:ss"}
            />
          </Form.Item>
          <div style={{ float: 'right' }}>
            <SaveButton />
            <DeleteButton />
          </div>
        </Form>
      </Card>
    </>
  );
};

export default SubResource;
