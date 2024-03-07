import {
  Card,
  Col,
  Form,
  Input,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
} from "antd";

import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const FamilySttings: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const { t } = useTranslation("layout");
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
        <div>
          <Row gutter={10}>
            <Col span={24}>
              <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
                <Form.Item
                  style={formStyle("calc(33% - 8px", "8px")}
                  label={t("labels.name")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(33% - 8px", "8px")}
                  label={t("labels.planner")}
                >
                  <Input />
                </Form.Item>
                <Form.Item style={formStyle("33%")} label={t("labels.group")}>
                  <Select />
                </Form.Item>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                style={{ marginTop: 10 }}
                title={t("titles.valuesFamily")}
                bodyStyle={{ height: "300px", overflowX: "auto", padding: 5 }}
              >
                <DataFetcher
                  apiUrl="http://localhost:3000/api/getData"
                  tipo="processos"
                >
                  {(treeData) => (
                    <>
                      <Tree
                        checkable
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
                    </>
                  )}
                </DataFetcher>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ margin: 10, float: "right" }}>
          <DeleteButton />
          <SaveButton />
        </div>
      </Form>
    </>
  );
};

export default FamilySttings;
