import React, { useState } from "react";
import { Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, List, Radio, Row, Select, Space, Tree } from "antd";

import { DataFetcher } from "components/DataFetcherJson";
import { ExclamationCircleOutlined, FlagOutlined } from "@ant-design/icons";
import CustomInputNumber from "components/CustomInputNumber";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

import dayjs from "dayjs";

const { TextArea } = Input;

const PcpData: React.FC = () => {

  const [editForm, setEditForm] = useState(true);

  const editPcpForm = () => {
    setEditForm(!editForm);
  }


  return (
    <Row gutter={6}>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            height: "100%",
            borderTop: "none",
            maxHeight: 714,
            padding: 0,
            width: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <DataFetcher
            apiUrl="http://localhost:3000/api/getData"
            tipo="data-example"
          >
            {(dataExample) => (
              <>
                <Divider orientation="left">Entregas</Divider>
                <div
                  style={{
                    height: "100%",
                    borderTop: "none",
                    maxHeight: 165,
                    margin: "0 5px 0 5px",
                    overflowY: "auto",
                  }}
                >
                  <List
                    style={{ height: 235 }}
                    dataSource={dataExample}
                    renderItem={(item, index) => (
                      <List.Item
                        style={{
                          background: index % 2 === 0 ? "white" : "#f0f0f0",
                          padding: 10,
                        }}
                      >
                        <FlagOutlined
                          style={{ marginRight: 10, color: "blue" }}
                        />
                        {`${item.dia} ${item.quantidade}`}
                      </List.Item>
                    )}
                  ></List>
                </div>
              </>
            )}
          </DataFetcher>
          <>
      <Divider orientation="left">Detalhes</Divider>
      <div
        style={{
          overflowY: "auto",
          height: "100%",
          maxHeight: 387,
          padding: 10,
        }}
      >
        <Form layout="vertical">
          <Form.Item
            style={{ display: "inline-block", width: "calc(33.33% - 8px)" }}
            label="OV"
            colon={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(33.33% - 8px)",
              margin: "0 8px",
            }}
            label="Item OV"
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ display: "inline-block", width: "calc(33.33% - 8px)" }}
            label="Item FERT "
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
            label={
              <span
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                Claim de planejamento
              </span>
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            label={
              <span
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              > Ordem de produção</span>
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            label="Potência"
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            label="Classe de tensão"
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ margin: "0 8px 20px 0px" }} label="Observações">
            <TextArea
              placeholder="Digite suas observações aqui"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          margin: 15,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Form.Item colon={false} label="Inspeção">
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ backgroundColor: "#95de64" }}>
            Salvar
          </Button>
        </Form.Item>
      </div>
    </>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            borderTop: "none",
            padding: 0,
            width: "100%",
            height: "100%",
            maxHeight: 714,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="processos">
      {(treeData) => (
        <>
          <Divider orientation="left">Processos</Divider>
          <Tree
            style={{
              overflowY: "auto",
              height: '100%',
              maxHeight: 607,
              minHeight: 607,
              textOverflow: "ellipsis",
              overflow: "hidden",
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
            >
              <Button
                type="primary"
                style={{ width: "calc(30% - 8px)", backgroundColor: "#95de64" }}
              >
                Confirmar
              </Button>
              <Button
                type="primary"
                style={{ width: "calc(30% - 8px)", backgroundColor: "#f5222d" }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </>
      )}
    </DataFetcher>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            width: "100%",
            borderTop: "none",
            height: "100%",
            maxHeight: 714,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
        <>
      <Divider orientation="left">Planejamento</Divider>
      <Form style={{ margin: 15 }}>
        <Radio.Group defaultValue={1}>
          <Space direction="vertical" style={{ marginBottom: 15 }}>
            <Radio value={1} disabled={editForm}  >
              Automático
            </Radio>
            <Radio value={2} disabled={editForm}  >
              Manual
            </Radio>
          </Space>
        </Radio.Group>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            label="Inicio"
            rules={[{ required: true }]}
          >
            <DatePicker
              defaultValue={dayjs("00/00/0000", dateFormatList[0])}
              format={dateFormatList[0]}
              disabled={editForm}      
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            rules={[{ required: true }]}
          >
            <DatePicker
              defaultValue={dayjs("00/00/0000", dateFormatList[0])}
              format={dateFormatList[0]}
              disabled={editForm}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Duração"
          style={{ display: "inline-block", width: "calc(60% - 8px)" }}
        >
          <CustomInputNumber value={1102} disabled={editForm}   style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(40% - 8px)",
            margin: "0 8px",
          }}
        >
          <Select value={"Minutos"} disabled={editForm}   />
        </Form.Item>
        <Form.Item
          label="Recurso"
          style={{ display: "inline-block", width: "calc(100% - 8px)" }}
        >
          <Input
            value={"TS - Elétrico - Rodrigo (lauffer)"}
            disabled={editForm}  
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </>
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="resources">
      {(resourceExample) => (
        <>
          <Divider orientation="left" style={{ margin: 0 }}>
            Consumo
          </Divider>
          <div style={{ maxHeight: 334 }}>
            <Form style={{ margin: 10 }}>
              <div
                style={{
                  height: "100%",
                  maxHeight: 123,
                  overflowY: "auto",
                  marginBottom: 15,
                }}
              >
                <List
                  style={{ height: 213 }}
                  dataSource={resourceExample}
                  renderItem={(item, index) => (
                    <List.Item
                      style={{
                        background: index % 2 === 0 ? "white" : "#f0f0f0",
                        padding: 10,
                      }}
                    >
                      <ExclamationCircleOutlined
                        style={{ marginRight: 10, color: " #FFBF00" }}
                      />
                      {`${item.data} ${item.consume}`}
                    </List.Item>
                  )}
                ></List>
              </div>
              <Form.Item
                label="Recurso"
                style={{ display: "inline-block", width: "calc(59% - 8px)" }}
              >
                <Input
                  value={"TS - Elétrico - Rodrigo (lauffer)"}
                  disabled={editForm}  
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Fim"
                style={{
                  display: "inline-block",
                  width: "calc(41% - 8px)",
                  margin: "0 8px",
                }}
              >
                <DatePicker
                  defaultValue={dayjs("07/12/2024", dateFormatList[0])}
                  format={dateFormatList[0]}
                  disabled={editForm}  
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Consumo em minutos"
                style={{ display: "inline-block", width: "calc(100% - 8px)" }}
              >
                <CustomInputNumber
                  value={"420"}
                  disabled={editForm}  
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Notas">
                <TextArea
                  value={"Abatimento com cálculo automático por Vendas."}
                  disabled={editForm}  
                  style={{ height: 50, resize: "none", width: 'calc(100% - 8px)' }}
                />
              </Form.Item>
            </Form>
          </div>
          <Card
            bodyStyle={{ padding: 10, margin: 0, float: "right" }}
            bordered={false}
          >
            <Button onClick={editPcpForm} type="primary">
              Editar
            </Button>
          </Card>
        </>
      )}
    </DataFetcher>
        </Card>
      </Col>
    </Row>
  );
};

export default PcpData;