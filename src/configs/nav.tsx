import { ContainerOutlined, EyeOutlined, FolderOpenOutlined, HomeOutlined, LockOutlined } from "@ant-design/icons";

export const DEFAULT_ROUTE = "/";

interface NavEntry {
  name: string; // Chave de tradução para o arquivo layout.json
  icon: React.FC; // Icone que será mostrado ao lado do item
  path: string; // Caminho da sua página
  roles?: string[]; // Define a quais tipos de usuários esta opção estará disponível
}

export const MENUS: NavEntry[] = [

  {
    name: "Nova Cotação",
    icon: ContainerOutlined,
    path: '/newQuotation',
  },
  {
    name: "Abrir Cotação",
    icon: FolderOpenOutlined,
    path: '/openQuotation',
  }
];
