import * as React from "react";

import { useAuth } from "@wmo-dev/login-utils";
import { Button } from "antd";

import { LoginModal } from "../LoginModal";

import { LanguageChanger } from "./LanguageChanger";
import { UserCard } from "./UserCard";
import * as Styled from "./styled";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const siteName = process.env.SITE_NAME;

  const { user, verifiedToken } = useAuth();
  const [visible, setVisible] = React.useState(true);

  const loggedIn = user ? true : verifiedToken ? false : undefined;
  const hideModal = !visible || loggedIn || loggedIn === undefined;

  return (
    <Styled.Wrapper className={className}>
      <Styled.Content>
        <img src="/assets/images/WEGLogo.png" alt="WEGLogo" />
        <Styled.Title>{siteName}</Styled.Title>
        {user ? (
          <UserCard />
        ) : (
          <Button type="primary" onClick={() => setVisible(true)}>
            Login
          </Button>
        )}
        <LoginModal
          visible={!hideModal}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        />
      </Styled.Content>
      <LanguageChanger />
    </Styled.Wrapper>
  );
};
