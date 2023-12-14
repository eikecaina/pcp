import { FlagOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, List } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DataFetcher } from "components/DataFetcherJson";

export const PcpDelivery: React.FC = () => {
  return (
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="data-example">
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
                  <FlagOutlined style={{ marginRight: 10, color: "blue" }} />
                  {`${item.dia} ${item.quantidade}`}
                </List.Item>
              )}
            ></List>
          </div>
        </>
      )}
    </DataFetcher>
  );
};

export const PcpDetails: React.FC = () => {
  return (
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
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            label="Claim de planejamento"
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            label="Ordem de produção"
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
  );
};
