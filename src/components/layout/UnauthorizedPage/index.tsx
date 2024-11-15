import * as React from "react";

import { Button, Result } from "antd";
import { useTranslation } from "next-i18next";

import { LoginModal } from "../LoginModal";

import * as Styled from "./styled";

export const UnauthorizedPage: React.FC = () => {
  const { t } = useTranslation("layout");
  const [visible, setVisible] = React.useState(false);

  return (
    <Styled.Wrapper>
      <Result
        status="403"
        title="403"
        subTitle={t("unauthorized.message")}
        extra={
          <Button type="primary" onClick={() => setVisible(true)}>
            {t("unauthorized.button")}
          </Button>
        }
      />
      <LoginModal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </Styled.Wrapper>
  );
};
