import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
} from "antd";
import React, { useState } from "react";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "next-i18next";

const { TextArea } = Input;

const ResourceSettings: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const {t} = useTranslation("layout");
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
      <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
        <Form layout="vertical">
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item style={formStyle("calc(25% - 5px)", "5px")} label="ID">
                <CustomInputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(25% - 5px)", "5px")}
                label={t("labels.name")}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(25% - 5px)", "5px")}
                label={t("labels.dailyAvailability")}
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(25% - 5px)")}
                label={t("labels.calendar")}
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 5px)", "5px")}
                label={t("labels.description")}
              >
                <TextArea style={{ height: 100, resize: 'none' }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card
                title="Famílias que o recurso está disponivel"
                bodyStyle={{ padding: 10 }}
              >
                <DataFetcher
                  apiUrl="http://localhost:3000/api/getData"
                  tipo="processos"
                >
                  {(treeData) => (
                    <>
                      <div
                        style={{
                          height: "220px",
                          overflowX: "auto",
                        }}
                      >
                        <Tree
                          checkable
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
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bodyStyle={{ padding: 10 }}
                title="Processos que consomem o recurso"
              >
                <DataFetcher
                  apiUrl="http://localhost:3000/api/getData"
                  tipo="processos"
                >
                  {(treeData) => (
                    <>
                      <div
                        style={{
                          height: "220px",
                          overflowX: "auto",
                        }}
                      >
                        <Tree
                          checkable
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
              </Card>
            </Col>
          </Row>
          <div style={{ margin: 10, float: "right" }}>
            <DeleteButton />
            <SaveButton />
          </div>
        </Form>
      </Card>
    </>
  );
};

export default ResourceSettings;
