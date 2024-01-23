import {
  CloseOutlined,
  EditOutlined,
  FileAddOutlined,
  LockOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Calendar,
  theme,
  Form,
  Input,
  Select,
  Tabs,
  Card,
  Row,
  Col,
} from "antd";
import type { TabsProps } from "antd";

const { TextArea } = Input;

export const CalendarSettings = () => {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const marginButton: React.CSSProperties = {
    marginRight: 4,
  };

  return (
    <>
      <Form layout="vertical">
        <Row>
          <Card bodyStyle={{ padding: 0 }}>
            <Col span={24} style={{ display: "flex" }}>
              <Col span={18} style={{ padding: "0 10px 0 10px" }}>
                <div style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    icon={<FileAddOutlined />}
                    style={marginButton}
                  ></Button>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    style={marginButton}
                  ></Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={marginButton}
                  ></Button>
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    style={marginButton}
                  ></Button>
                  <Button
                    type="primary"
                    icon={<LockOutlined />}
                    style={marginButton}
                  ></Button>
                </div>
                <Form.Item
                  label="Calendários"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: 8,
                  }}
                >
                  <Select />
                </Form.Item>
                <Form.Item
                  label="Nome"
                  style={{ display: "inline-block", width: "50%" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Base"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: 8,
                  }}
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
              </Col>

              <Col span={6}>
                <div
                  style={{
                    borderLeft: `1px solid ${token.colorBorderSecondary}`,
                  }}
                >
                  <Calendar fullscreen={false} />
                </div>
              </Col>
            </Col>
          </Card>
        </Row>
      </Form>
    </>
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
