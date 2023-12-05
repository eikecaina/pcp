import Link from "next/link";
import { useRouter } from "next/router";

import * as React from "react";

import { useAuth } from "@wmo-dev/login-utils";
import { Layout, Menu } from "antd";
import { useTranslation } from "next-i18next";

import { MENUS } from "configs/nav";
import { usePersistedState } from "hooks/usePersistedState";

export interface SiderProps {
  className?: string;
}

const { SubMenu } = Menu;

export const Sider: React.FC<SiderProps> = ({ className }) => {
  const { t } = useTranslation("layout");

  const router = useRouter();
  const { user } = useAuth();

  const [collapsed, setCollapsed] = usePersistedState("sider.collapsed", true);

  const current = router.asPath.match(/^\/(\w*)/)[0];

  const userMenus = MENUS.filter((menu) => {
    if (!menu.roles) {
      return true;
    }

    if (!user) {
      return false;
    }

    if (menu.roles.includes(user.role)) {
      return true;
    }

    return false;
  });

  return (
    <Layout.Sider
      className={className}
      theme="light"
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsible
    >
      <Menu
        selectedKeys={current ? [current] : undefined}
        mode="vertical"
        theme="light"
      >
        {userMenus.map((menu) => {
          if (menu.children && menu.children.length > 0) {
            return (
              <SubMenu
                key={menu.path}
                icon={<menu.icon />}
                title={<span>{t(menu.name)}</span>}
              >
                {menu.children.map((submenu) => (
                  <Menu.Item key={submenu.path}>
                    <Link href={submenu.path} passHref>
                      <a>
                        <span>{t(submenu.name)}</span>
                      </a>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={menu.path} icon={<menu.icon />}>
                <Link href={menu.path} passHref>
                  <a>
                    <span>{t(menu.name)}</span>
                  </a>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Layout.Sider>
  );
};