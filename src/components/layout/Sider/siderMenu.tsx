
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as React from "react";
import { Menu } from "antd";

import { MENUS } from "configs/nav";
// import { useTranslation } from "react-i18next";
import { Route } from "next";
import { Session } from "next-auth";

export interface Props {
  session?: Session
}

export default function SiderMenu({session = {}}) {
  // const { t } = useTranslation("layout");
    const router = useRouter();
    const path = router?.asPath?.match(/^\/(\w*)/);
    const current = path ? path[0] : undefined;
    
    let userMenus = MENUS.filter((menu) => {
      const hasRoles = menu && menu.roles && menu.roles.length > 0;
      if(hasRoles){
        menu.roles?.forEach(role => {
          if(session && session.roles?.includes(role)){
            return true;
          }
        })
        return false;
      } else {
        return true;
      }
    });

    // session.then((session) => {
    //   userMenus = MENUS.filter((menu) => {
    //     const hasRoles = menu && menu.roles && menu.roles.length > 0;
    //     if(hasRoles){
    //       menu.roles?.forEach(role => {
    //         if(session && session.roles?.includes(role)){
    //           return true;
    //         }
    //       })
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });
    // })
  
    return (<Menu
    selectedKeys={current ? [current] : undefined}
    items={userMenus.map((menu) => ({
      label: (
        <Link href={menu.path as Route} passHref>
            <span>{t(menu.name)}</span>
        </Link>
      ),
      key: menu.path,
      icon: <menu.icon />,
    }))}
  ></Menu>)
  };