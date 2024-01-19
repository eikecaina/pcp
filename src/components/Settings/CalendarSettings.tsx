import { Tabs } from "antd";
import type { TabsProps } from "antd";

export const CalendarSettings = () => {
  return (
    <div> teste </div>
  );
};

export const Maintenance = () => {
    return (
        <div> tesste </div>
    );
}

export const PageTabs = () => {
    return (
        <Tabs defaultActiveKey="1" items={items}/>
    )
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Calendário",
    children: <CalendarSettings />,
  },
  {
    key: "2",
    label: 'Manutenção',
    children: <Maintenance/>
  }
];
