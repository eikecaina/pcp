import { Form, Radio, Select } from "antd";
import { RadioChangeEvent } from "antd/lib";
import { useState } from "react";

const EditQuotation: React.FC = () => {
    const [disableSelect, setDisableSelect] = useState();

    const handleSelectRadio = (e: RadioChangeEvent) => {
        setDisableSelect(e.target.value)
    }

  return (
    <Form layout="vertical">
      <Radio.Group onChange={handleSelectRadio} style={{ width: '100%' }}>
        <Form.Item
          label="Form 1"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginRight: 8,
          }}
        >
          <Radio value={1}></Radio>
          <Select disabled={disableSelect === 2}></Select>
        </Form.Item>
        <Form.Item
          label="Form 2"
          style={{ display: "inline-block", width: "50%" }}
        >
          <Radio value={2}></Radio>
          <Select disabled={disableSelect === 1}></Select>
        </Form.Item>
      </Radio.Group>
    </Form>
  );
};

export default EditQuotation;
