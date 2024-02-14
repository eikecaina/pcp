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

const ProcessSettings: React.FC = () => {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const [valueTime, setValueTime] = useState(1);
  const onChangeTime = (e: RadioChangeEvent) => {
    setValueTime(e.target.value);
  };

  const options = [
    { label: "Visivel para cotação", value: "Visivel para cotação" },
    { label: "Atrasar", value: "Atrasar" },
    { label: "Processo fabril", value: "Processo fabril" },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type="Lista"
          value={value}
        />
      </div>
      <Form layout="vertical">
        <Row gutter={10}>
          <Col span={9}>
            <Card
              style={{ height: "420px" }}
              title="Definição"
              bodyStyle={{ padding: 10 }}
            >
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label="Nome"
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label="Descrição"
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 8px)", "8px")}
                label="Calendário"
              >
                <Select />
              </Form.Item>
              <Checkbox.Group style={{ width: "100%" }}>
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
              style={{ height: "420px" }}
              title="Definição por tempo"
              bodyStyle={{ padding: 10, height: "100%" }}
            >
              <Col span={24}>
                <Radio.Group onChange={onChangeTime} value={valueTime}>
                  <Radio value={1}>
                    Tempo Fixo
                    <DatePicker
                      disabled={valueTime === 2 || valueTime === 3}
                      style={{ marginLeft: 5 }}
                      showTime
                      format={"DD/MM/YYYY HH:mm:ss"}
                    />
                  </Radio>
                  <Radio value={2}>Tempo por família</Radio>
                  <Radio value={3}>Tempo por característica</Radio>
                  {valueTime === 2 ? (
                    <Form.Item
                      style={{ width: "60%", marginTop: 20 }}
                      label="Família"
                    >
                      <Select showSearch />
                    </Form.Item>
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
