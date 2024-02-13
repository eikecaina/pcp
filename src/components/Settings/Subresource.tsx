import { Card, Form, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import { RadioButtons } from "./ButtonsComponent";

const SubResource: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <Form layout="vertical">
      <RadioButtons value={value} onChange={onChange} />
      <Card>
      teste  
      </Card>
    </Form>
  );
};

export default SubResource;
