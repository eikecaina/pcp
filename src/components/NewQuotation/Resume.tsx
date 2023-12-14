import { Card, Tabs, TabsProps } from "antd";
import { Cotacao, Detalhado, Resumido } from "./ResumeData";
const Resume: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Cotação",
      children: <Cotacao />,
    },
    {
      key: "2",
      label: "Resumo",
      children: <Resumido />,
    },
    {
      key: "3",
      label: "Detalhado",
      children: <Detalhado />,
    },
  ];

  return (
    <Card bodyStyle={{ padding: 0 }} style={{ height: "100%" }}>
      <Tabs
        tabBarStyle={{ padding: "0 0 0 15px" }}
        tabBarGutter={20}
        type="line"
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          margin: 0,
        }}
        defaultActiveKey="1"
        items={items}
      />
    </Card>
  );
};

export default Resume;
