import { Card, Col, Divider, Form, Input, Row, Select, Tree } from "antd";
import React from "react";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

const ResourceSettings: React.FC = () => {
  return (
    <Form layout="vertical">
      <Card bodyStyle={{ padding: 0 }}>
        <Divider orientation="left">Definição</Divider>
        <div style={{ margin: 10 }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)", "5px")}
                label="Grupo"
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)", "5px")}
                label="ID"
              >
                <CustomInputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)", "5px")}
                label="Nome"
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)", "5px")}
                label="Descrição"
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)", "5px")}
                label="Disponibilidade diária"
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)")}
                label="Calendário"
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={12}>
              <DataFetcher
                apiUrl="http://localhost:3000/api/getData"
                tipo="processos"
              >
                {(treeData) => (
                  <>
                    <Divider orientation="left">
                      Famílias que o recurso está disponivel
                    </Divider>
                    <div
                      style={{
                        height: "360px",
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
            </Col>
            <Col span={12}>
              <DataFetcher
                apiUrl="http://localhost:3000/api/getData"
                tipo="processos"
              >
                {(treeData) => (
                  <>
                    <Divider orientation="left">
                      Processos que consomem o recurso
                    </Divider>
                    <div
                      style={{
                        height: "360px",
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
            </Col>
          </Row>
        </div>
        <div style={{ margin: 10, float: "right" }}>
          <NewButton />
          <EditButton />
          <DeleteButton />
          <SaveButton />
        </div>
      </Card>
    </Form>
  );
};

export default ResourceSettings;
