import { Tabs, TabsProps } from "antd";
import { CalendarSettings } from "./CalendarSettings";
import GroupSettings from "./GroupSettings";
import FamilySttings from "./FamilySettings";
import CharacteristicsSettings from "./CharacteristicsSettings";
import ValueSettings from "./ValueSettings";
import ProcessSettings from "./ProcessSettings";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Grupos",
    children: <GroupSettings />,
  },
  {
    key: "2",
    label: "Familias",
    children: <FamilySttings />,
  },
  {
    key: "3",
    label: "Características",
    children: <CharacteristicsSettings />,
  },
  {
    key: "4",
    label: "Valores",
    children: <ValueSettings />,
  },
  {
    key: "5",
    label: "Processos",
    children: <ProcessSettings />,
  },
  {
    key: "6",
    label: "Ligações",
    children: "Ligações",
  },
  {
    key: "7",
    label: "Recursos",
    children: "Recursos",
  },
  {
    key: "8",
    label: "Sub-Recurso",
    children: "Sub-Recurso",
  },
  {
    key: "9",
    label: "Materias Críticos(Material)",
    children: "Materias Críticos(Material)",
  },
  {
    key: "10",
    label: "Materias Críticos(Impacto)",
    children: "Materias Críticos(Impacto)",
  },
  {
    key: "12",
    label: "Calendários",
    children: <CalendarSettings />,
  },
];
const GeneralSettings: React.FC = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default GeneralSettings;
