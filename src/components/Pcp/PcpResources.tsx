import { Card, Form, Select } from "antd";

const PcpResources: React.FC = () => {
  return (
    <Card
      style={{
        height: 720,
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Card style={{ width: 'calc(100% + 100px)' }}>
        <Form>
          <Form.Item style={{ width: '100%' }}>
            <Select />
          </Form.Item>
          <Form.Item style={{ width: 'calc(50% - 8px)', display: 'inline-block', margin: '0 16px 0 0' }}>
            <Select />
          </Form.Item>
          <Form.Item style={{ width: 'calc(50% - 8px)', display: 'inline-block' }}>
            <Select />
          </Form.Item>
        </Form>
      </Card>
    </Card>
  );
};

export default PcpResources;
