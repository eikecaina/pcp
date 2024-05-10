import {
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
} from "antd";
import { DataFetcher } from "components/DataFetcherJson";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { DeleteButton, RadioButtons, SaveButton } from "./ButtonsComponent";
import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

const ValueSettings: React.FC = () => {

  const { t } = useTranslation("layout");

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const options = [
    { label: t("labels.newAprovattion"), value: "Nova aprovação" },
    { label: t("labels.newCertificate"), value: "Novo certificado" },
    { label: t("labels.repetitionAprovattion"), value: "Repetição aprovação" },
    { label: t("labels.repetitionCertificate"), value: "Repetição certificado" },
  ];

  return (
    <>
      <RadioButtons onChange={onChange} value={value} />
      <Row gutter={10}>
        <Col span={12}>
          <Card
            title={t("titles.definitionFamily")}
            style={{ height: "450px", overflowX: "auto" }}
          >
            {value === 2 ? (
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
                  </>
                )}
              </DataFetcher>
            ) : (
              <DataFetcher
                apiUrl="http://localhost:3000/api/getData"
                tipo="processos"
              >
                {(treeData) => (
                  <>
                    <Tree
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
                  </>
                )}
              </DataFetcher>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
            <Form layout="vertical" disabled={value === 1}>
             
              <Form.Item style={formStyle("100%")} label={t("labels.name")}>
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(50% - 8px)", "8px")}
                label={t("labels.charact")}
              >
                <Select />
              </Form.Item>
              <Form.Item style={formStyle("50%")} label={t("labels.position")}>
                <CustomInputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
              <Divider orientation="left">{t("titles.condition")}</Divider>
              <div>
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
            </Form>
          </Card>
        </Col>
      </Row>
      <div style={{ margin: 10, float: "right" }}>
        <DeleteButton />
        <SaveButton />
      </div>
    </>
  );
};

export default ValueSettings;
