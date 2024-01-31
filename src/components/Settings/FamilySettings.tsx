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
import ButtonsComponent from "./ButtonsComponent";
import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";

const FamilySttings: React.FC = () => {
  return (
    <>
      <Form layout="vertical">
        <Card bodyStyle={{ padding: 10 }}>
          <ButtonsComponent new={true} edit={true} delete={true} save={true} />
          <Row gutter={10}>
            <Col span={24}>
              <div>
                <Form.Item
                  style={formStyle("calc(50% - 8px", "8px")}
                  label="Lista"
                >
                  <Select />
                </Form.Item>
                <Form.Item style={formStyle("calc(50% - 8px")} label="Nome">
                  <Input />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(50% - 8px", "8px")}
                  label="Planejador"
                >
                  <Input />
                </Form.Item>
                <Form.Item style={formStyle("calc(50% - 8px")} label="Grupo">
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <div style={{ height: "450px", overflowX: "auto" }}>
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
              </div>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};

export default FamilySttings;
