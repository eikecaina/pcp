import { useRouter } from "next/router";

import * as React from "react";
import { Layout, Menu } from "antd";
import { usePersistedState } from "hooks/usePersistedState";
import SiderMenu from "./siderMenu";
import { getSession } from "lib/utils/sessionTokenAccessor";
import { useCookies } from "react-cookie";

export interface SiderProps {
  className?: string;
}

export const Sider: React.FC<SiderProps> = ({ className }) => {
  const [collapsed, setCollapsed] = usePersistedState("sider.collapsed", true);

  const session = getSession().then(s => s);
  return (
    <Layout.Sider
      className={className}
      theme="light"
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsible
    >
      <SiderMenu session={session}></SiderMenu>
    </Layout.Sider>
  );
}


