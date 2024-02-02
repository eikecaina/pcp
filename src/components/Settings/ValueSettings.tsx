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
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

const ValueSettings: React.FC = () => {
  const options = [
    { label: "Nova aprovação", value: "Nova aprovação" },
    { label: "Novo certificado", value: "Novo certificado" },
    { label: "Repetição aprovação", value: "Repetição aprovação" },
    { label: "Repetição certificado", value: "Repetição certificado" },
  ];

  return (
    <Form layout="vertical">
      <Row gutter={10}>
        <Col span={12}>
          <Card title="Família de definição" style={{ height: "450px", overflowX: "auto" }}>
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
          </Card>
        </Col>
        <Col span={12}>
          
          <Card title="Definição" bodyStyle={{ padding: 10 }}>
            <Form.Item style={formStyle("calc(50% - 8px)", "8px")} label="ID">
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
            <Divider orientation="left">Condições</Divider>
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

export default ValueSettings;
