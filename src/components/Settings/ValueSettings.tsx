import {
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tree,
} from "antd";
import { DataFetcher } from "components/DataFetcherJson";
import ButtonsComponent from "./ButtonsComponent";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";

const ValueSettings: React.FC = () => {
  const options = [
    { label: "Nova aprovação", value: "Nova aprovação" },
    { label: "Novo certificado", value: "Novo certificado" },
    { label: "Repetição aprovação", value: "Repetição aprovação" },
    { label: "Repetição certificado", value: "Repetição certificado" },
  ];

  return (
    <Form layout="vertical">
      <Card bodyStyle={{ padding: 10 }}>
        <ButtonsComponent new={true} edit={true} delete={true} save={true} />
        <Row gutter={10}>
          <Col span={12}>
            <Card
              bodyStyle={{ padding: 0 }}
              style={{ height: "450px", overflowX: "auto" }}
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
          <Col span={12}>
            <Card bodyStyle={{ padding: 0 }} title="Definição">
              <div style={{ margin: 10 }}>
                <Form.Item
                  style={formStyle("calc(50% - 8px)", "8px")}
                  label="ID"
                >
                  <CustomInputNumber
                    defaultValue={50}
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item style={formStyle("50%")} label="Nome">
                  <Input />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(50% - 8px)", "8px")}
                  label="Característica"
                >
                  <Select />
                </Form.Item>
                <Form.Item style={formStyle("50%")} label="Posição">
                  <CustomInputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <Divider orientation="left">Condições</Divider>
              <div style={{ margin: 10 }}>
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
            </Card>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default ValueSettings;
