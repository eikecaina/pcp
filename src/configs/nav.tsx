import { ContainerOutlined, SettingOutlined } from "@ant-design/icons";

export const DEFAULT_ROUTE = "/";

interface NavEntry {
  name: string; // Chave de tradução para o arquivo layout.json
  icon?: React.FC; // Icone que será mostrado ao lado do item
  path: string; // Caminho da sua página
  roles?: string[]; // Define a quais tipos de usuários esta opção estará disponível
  children?: NavEntry[],
}

export const MENUS: NavEntry[] = [
  {
    name: "menus.newquotation",
    icon: ContainerOutlined,
    path: '/newQuotation',
  },
  {
    name: "menus.settings",
    icon: SettingOutlined,
    path: '/geralSettings',
  },
];

