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
import { useTranslation } from "react-i18next";
import { DatePickerProps } from "antd/lib/date-picker";
import { Save } from "@/app/api/services/Group/data";

const { TextArea } = Input;

const GroupSettings: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const { t } = useTranslation("layout");

  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleDateChange: DatePickerProps['onChange'] = (date) => { 
      const formattedData = date.format("DD/MM/YYYY HH:mm:ss");
      setFormData({ ...formData, unlockDateTime: formattedData });
  };
  
  const handleButtonClick = async () => {
    try {
      await Save(formData);
  
    } catch (error) {
      console.log(formData);
    }
  };

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
          <Row gutter={10}>
            <Col span={12}>
              <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
                <Form.Item
                  label={t("labels.name")}
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Input
                    onChange={(e) => handleInputChange("group", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.email")}
                  style={formStyle("calc(50%)")}
                >
                  <Input
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.description")}
                  style={{ marginBottom: 20 }}
                >
                  <TextArea
                    style={{ resize: "none", height: "150px" }}
                    onChange={(e) => handleInputChange("desc", e.target.value)}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={t("titles.temporaryBlock")}
                bodyStyle={{ padding: 10 }}
              >
                <Form.Item
                  label={t("labels.state")}
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select
                    options={[{ value: "Ativo" }, { value: "Bloqueado" }]}
                    onChange={handleSelectChange}
                  />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(50%)")}
                  label={t("labels.unlock")}
                >
                  <DatePicker
                    showTime
                    format={"DD/MM/YYYY HH:mm:ss"}
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                  />
                </Form.Item>

                <Form.Item
                  label={t("labels.warnings")}
                  style={{ marginBottom: 20 }}
                >
                  <TextArea style={{ resize: "none", height: "150px" }} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>
      </Form>
      <div style={{ margin: 10, float: "right" }}>
        <DeleteButton />
        <SaveButton onClick={handleButtonClick} />
      </div>
    </>
  );
};

export default GroupSettings;
