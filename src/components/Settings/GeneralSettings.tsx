import {
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
  FileAddOutlined,
  LockOutlined,
  MenuOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Drawer, FloatButton, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { CalendarSettings, PageTabs } from "./CalendarSettings";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Grupos",
    children: "Grupos",
  },
  {
    key: "2",
    label: "Calendário",
    children: <CalendarSettings />,
  },
  {
    key: "3",
    label: "Características",
    children: "Características",
  },
  {
    key: "4",
    label: "Valores",
    children: "Valores",
  },
  {
    key: "5",
    label: "Processos",
    children: "Processos",
  },
  {
    key: "6",
    label: "Ligações",
    children: "Ligações",
  },
  {
    key: "7",
    label: "Sub-Recurso",
    children: "Sub-Recurso",
  },
  {
    key: "8",
    label: "Materias Críticos(Material)",
    children: "Materias Críticos(Material)",
  },
  {
    key: "9",
    label: "Materias Críticos(Impacto)",
    children: "Materias Críticos(Impacto)",
  },
  {
    key: "10",
    label: "Materias Críticos(Impacto)",
    children: "Materias Críticos(Impacto)",
  },
];
const GeneralSettings: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default GeneralSettings;
