import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
} from "antd";
import React, { useState } from "react";
import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "next-i18next";

const ProcessSettings: React.FC = () => {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const [valueTime, setValueTime] = useState(1);
  const onChangeTime = (e: RadioChangeEvent) => {
    setValueTime(e.target.value);
  };

  const {t} = useTranslation("layout");

  const options = [
    { label: t("labels.visibleQuotations"), value: "Visivel para cotação" },
    { label: t("labels.dalayer"), value: "Atrasar" },
    { label: t("labels.manufacturingProcess"), value: "Processo fabril" },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type={t("labels.list")}
          value={value}
        />
      </div>
      <Form layout="vertical">
        <Row gutter={10}>
          <Col span={9}>
            <Card
              style={{ height: "440px" }}
              title={t("titles.definition")}
              bodyStyle={{ padding: 10 }}
            >
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label={t("labels.name")}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label={t("labels.description")}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label={t("labels.calendar")}
              >
                <Select />
              </Form.Item>
              <Checkbox.Group style={{ width: "100%", display: "grid" }}>
                {options.map((option) => (
                  <Checkbox
                    key={option.value}
                    value={option.value}
                    style={{ margin: "7px" }}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Card>
          </Col>

          <Col span={15}>
            <Card
              style={{ height: "440px" }}
              title={t("titles.definition")}
              bodyStyle={{ padding: 10, height: "100%" }}
            >
              <Col span={24}>
                <Radio.Group onChange={onChangeTime} value={valueTime}>
                  <Radio value={1}>
                  {t("labels.fixedTime")}
                    <CustomInputNumber
                      disabled={valueTime === 2 || valueTime === 3}
                      style={{ marginLeft: 5, width: "30%" }}
                      placeholder="0"
                    />
                    <Select
                      disabled={valueTime === 2 || valueTime === 3}
                      style={{ marginLeft: 5, width: "45%" }}
                      placeholder="Dia"
                    />
                  </Radio>
                  <Radio value={2}>{t("labels.familyTime")}</Radio>
                  <Radio value={3}>{t("labels.timeCharacteristic")}</Radio>
                  {valueTime === 2 ? (
                    <>
                      <div style={{ width: "40%", marginTop: 40 }}>
                        <Form.Item
                          style={formStyle("calc(50% - 5px)", "5px")}
                          label={t("labels.family")}
                        >
                          <Select showSearch />
                        </Form.Item>
                        <Form.Item label={t("labels.period")} style={formStyle("calc(50% - 5px)", "5px")}>
                          <Select />
                        </Form.Item>
                        <Form.Item
                          label={t("labels.newApproval")}
                          style={formStyle("calc(50% - 5px)", "5px")}
                        >
                          <CustomInputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                          label={t("labels.newCertificate")}
                          style={formStyle("calc(50% - 5px)", "5px")}
                        >
                          <CustomInputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                          label={t("labels.repeatApproval")}
                          style={formStyle("calc(50% - 5px)", "5px")}
                        >
                          <CustomInputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                          label={t("labels.certificateRepetition")}
                          style={formStyle("calc(50% - 5px)", "5px")}
                        >
                          <CustomInputNumber style={{ width: "100%" }} />
                        </Form.Item>
                      </div>
                    </>
                  ) : null}
                  {valueTime === 3 ? (
                    <Form.Item
                      label="Características"
                      style={{ marginTop: 20, marginBottom: 0 }}
                    >
                      <DataFetcher
                        apiUrl="http://localhost:3000/api/getData"
                        tipo="processos"
                      >
                        {(treeData) => (
                          <>
                            <div
                              style={{
                                height: "250px",
                                overflowX: "auto",
                              }}
                            >
                              <Tree
                                style={{
                                  height: "100%",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                                showLine={true}
                                defaultExpandedKeys={["0-0-0"]}
                                treeData={treeData}
                              />
                            </div>
                          </>
                        )}
                      </DataFetcher>
                    </Form.Item>
                  ) : null}
                </Radio.Group>
              </Col>
            </Card>
          </Col>
        </Row>
        <div style={{ margin: 10, float: "right" }}>
          <DeleteButton />
          <SaveButton />
        </div>
      </Form>
    </>
  );
};

export default ProcessSettings;
