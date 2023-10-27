import { useTranslation } from "next-i18next";

import { useAuth } from "@wmo-dev/login-utils";
import { Dropdown } from "antd";

import * as Styled from "./styled";

export interface Props {
  className?: string;
}

export const UserCard: React.FC<Props> = ({ className = "" }) => {
  const { t } = useTranslation("layout");

  const { user, logout } = useAuth();

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [
          {
            label: <div onClick={logout}>{t("userCard.menus.logout")}</div>,
            key: "logout",
          },
        ],
      }}
    >
      <Styled.UserCardWrapper className={className}>
        <span>
          <strong>{t("userCard.greeting")}, </strong>
          {user?.name}
        </span>
      </Styled.UserCardWrapper>
    </Dropdown>
  );
};
