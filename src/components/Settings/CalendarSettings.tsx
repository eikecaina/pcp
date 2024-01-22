import { Button, Calendar, theme, Form, Input, Select, Tabs } from "antd";
import type { TabsProps } from "antd";

const { TextArea } = Input;

export const CalendarSettings = () => {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: "50%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    display: "inline-block",
  };

  return (
    <Form style={{ display: "flex" }} layout="vertical">
      <div style={{ width: "60%" }}>
        <div style={{ paddingBottom: "16px" }}>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </div>
        <Form.Item
          label="Calendários"
          style={{ display: "inline-block", width: "50%" }}
        >
          <Select></Select>
        </Form.Item>
        <Form.Item
          label="Nome"
          style={{ display: "inline-block", width: "50%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Base"
          style={{ display: "inline-block", width: "50%" }}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Descrição"
          style={{ display: "inline-block", width: "50%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Obs">
          <TextArea style={{ resize: "none" }} />
        </Form.Item>
      </div>
      <div style={wrapperStyle}>
        <Calendar fullscreen={false} />
      </div>
    </Form>
  );
};

export const Maintenance = () => {
  return <div> tesste </div>;
};

export const PageTabs = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Calendário",
    children: <CalendarSettings />,
  },
  {
    key: "2",
    label: "Manutenção",
    children: <Maintenance />,
  },
];
