import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  TimePicker,
  Tree,
} from "antd";
import React, { useState } from "react";
import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

const ProcessSettings: React.FC = () => {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const options = [
    { label: "Visivel para cotação", value: "Visivel para cotação" },
    { label: "Atrasar", value: "Atrasar" },
    { label: "Processo fabril", value: "Processo fabril" },
  ];

  return (
    <Form layout="vertical">
      <Row gutter={10}>
        <Col span={11}>
          <Card title="Definição" bodyStyle={{ padding: 10 }}>
            <Form.Item
              style={formStyle("calc(50% - 8px)", "8px")}
              label="Lista"
            >
              <Select />
            </Form.Item>
            <Form.Item style={formStyle("calc(50% - 8px)", "8px")} label="Nome">
              <Input />
            </Form.Item>
            <Form.Item
              style={formStyle("calc(50% - 8px)", "8px")}
              label="Descrição"
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={formStyle("calc(50% - 8px)", "8px")}
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

        <Col span={13}>
         
          <Card title="Definição por tempo" bodyStyle={{ padding: 10, height: '100%' }}>
            <Col span={24}>
              <Radio.Group buttonStyle="solid" optionType="button" onChange={onChange} value={value}>
                <Radio  value={1}>
                  Tempo Fixo
                  <DatePicker
                   showTime
                   format={"DD/MM/YYYY HH:mm:ss"}
                  />
                </Radio>
                <Radio value={2}>Tempo por família</Radio>
                <Radio value={3}>Tempo por característica</Radio>
                {value === 2 ? (
                  <Form.Item
                    style={{ width: "100%", marginTop: 20 }}
                    label="Família"
                  >
                    <Select showSearch />
                  </Form.Item>
                ) : null}
                {value === 3 ? (
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
                              height: "329px",
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
        <NewButton />
        <EditButton />
        <DeleteButton />
        <SaveButton />
      </div>
    </Form>
  );
};

export default ProcessSettings;
