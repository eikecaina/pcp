import {
    Button,
    Card,
    DatePicker,
    Divider,
    Form,
    Input,
    List,
    Radio,
    Select,
    Space,
  } from "antd";
  import CustomInputNumber from "components/CustomInputNumber";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  
  dayjs.extend(customParseFormat);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  
  import dayjs from "dayjs";
  import TextArea from "antd/es/input/TextArea";
  import { ExclamationCircleOutlined } from "@ant-design/icons";
  import { DataFetcher } from "components/DataFetcherJson";
  
  export const PcpPlanning: React.FC = () => {
    return (
      <>
        <Divider orientation="left">Planejamento</Divider>
        <Form style={{ margin: 15 }}>
          <Radio.Group defaultValue={1}>
            <Space direction="vertical" style={{ marginBottom: 15 }}>
              <Radio value={1} disabled>
                Automático
              </Radio>
              <Radio value={2} disabled>
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
                disabled
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
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Duração"
            style={{ display: "inline-block", width: "calc(60% - 8px)" }}
          >
            <CustomInputNumber value={1102} disabled style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(40% - 8px)",
              margin: "0 8px",
            }}
          >
            <Select value={"Minutos"} disabled />
          </Form.Item>
          <Form.Item
            label="Recurso"
            style={{ display: "inline-block", width: "99%" }}
          >
            <Input
              value={"TS - Elétrico - Rodrigo (lauffer)"}
              disabled
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </>
    );
  };
  
  export const PcpConsum: React.FC = () => {
    return (
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
                    disabled
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
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Consumo em minutos"
                  style={{ display: "inline-block", width: "calc(100% - 8px)" }}
                >
                  <CustomInputNumber
                    value={"420"}
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
  
                <Form.Item label="Notas">
                  <TextArea
                    value={"Abatimento com cálculo automático por Vendas."}
                    disabled
                    style={{ height: 50, resize: "none" }}
                  />
                </Form.Item>
              </Form>
            </div>
            <Card
              bodyStyle={{ padding: 10, margin: 0, float: "right" }}
              bordered={false}
            >
              <Button type="primary" style={{ backgroundColor: "#bfbfbf" }}>
                Editar
              </Button>
            </Card>
          </>
        )}
      </DataFetcher>
    );
  };
  