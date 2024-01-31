import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TimePicker,
  Tree,
} from "antd";
import React from "react";
import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import ButtonsComponent from "./ButtonsComponent";

const ProcessSettings: React.FC = () => {
  const options = [
    { label: "Visivel para cotação", value: "Visivel para cotação" },
    { label: "Atrasar", value: "Atrasar" },
    { label: "Processo fabril", value: "Processo fabril" },
  ];
  return (
    <Form layout="vertical">
      <Card bodyStyle={{ padding: 10 }}>
        <ButtonsComponent new={true} edit={true} delete={true} save={true} />
        <Row gutter={5}>
          <Col span={11}>
            <div>
              <Form.Item
                style={formStyle("calc(50% - 8px)", "8px")}
                label="Lista"
              >
              <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(50% - 8px)", "8px")}
                label="Nome"
              >
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
              <Checkbox.Group style={{ display: "grid" }}>
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
            </div>
          </Col>

          <Col span={13}>
            <Card title="Definição de tempo" bodyStyle={{ padding: 10 }}>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Radio.Group>
                  <Radio value={1}>
                    Tempo Fixo
                    <TimePicker size="small" style={{ marginLeft: 10 }} />
                  </Radio>
                  <Radio value={2}>Tempo por familia</Radio>
                  <Radio value={3}>Tempo por característica</Radio>
                </Radio.Group>
              </Col>
              <DataFetcher
                apiUrl="http://localhost:3000/api/getData"
                tipo="processos"
              >
                {(treeData) => (
                  <>
                    <div style={{ height: "450px", overflowX: "auto" }}>
                      <Tree
                      disabled
                        style={{
                          height: "100%",
                          maxHeight: 607,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        showLine={true}
                        defaultExpandedKeys={["0-0-0"]}
                        treeData={treeData}
                      />
                      <div style={{ padding: 10 }}>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "space-evenly",
                          }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </DataFetcher>
            </Card>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default ProcessSettings;
