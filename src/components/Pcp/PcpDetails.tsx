import { Button, Checkbox, Divider, Form, Input } from "antd";
const { TextArea } = Input;

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
  