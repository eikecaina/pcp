import { ContainerOutlined, HomeOutlined, LockOutlined } from "@ant-design/icons";

export const DEFAULT_ROUTE = "/";

interface NavEntry {
  name: string; // Chave de tradução para o arquivo layout.json
  icon: React.FC; // Icone que será mostrado ao lado do item
  path: string; // Caminho da sua página
  roles?: string[]; // Define a quais tipos de usuários esta opção estará disponível
}

export const MENUS: NavEntry[] = [
  {
    name: "menus.home",
    icon: HomeOutlined,
    path: "/",
  },
  {
    name: "WTCP",
    icon: ContainerOutlined,
    path: '/wtcp',
  },
  {
    name: "menus.protected",
    icon: LockOutlined,
    path: "/protected",
  },
];
