import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tree,
} from "antd";

import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

const FamilySttings: React.FC = () => {
  return (
    <>
      <Form layout="vertical">
        <Row gutter={10}>
          <Form.Item style={formStyle("calc(33% - 5px", "5px")} label="Lista">
            <Select />
          </Form.Item>
          <Col span={24}>
            <Card title="Definição" bodyStyle={{ padding: 10 }}>
              <Form.Item
                style={formStyle("calc(33% - 5px", "5px")}
                label="Nome"
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33% - 5px", "5px")}
                label="Planejador"
              >
                <Input />
              </Form.Item>
              <Form.Item style={formStyle("calc(33% - 5px")} label="Grupo">
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={14}>
            <Card
              title="Valores que definem a familia"
              bodyStyle={{ height: "420px", overflowX: "auto" }}
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
        <div style={{ margin: 10, float: "right" }}>
          <NewButton />
          <EditButton />
          <DeleteButton />
          <SaveButton />
        </div>
      </Form>
    </>
  );
};

export default FamilySttings;
