import * as React from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { useAuth } from "@wmo-dev/login-utils";
import { Form, Input, Modal, ModalProps } from "antd";
// import { useTranslation } from "next-i18next";
import { useForm, Controller } from "react-hook-form";
import {useSession, signIn, signOut} from "next-auth/react"

import * as Styled from "./styled";

interface LoginFormInput {
  username: string;
  password: string;
}

export interface LoginModalProps extends ModalProps {
  visible?: boolean;
  onOk?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  ...props
}) => {
  // const { t } = useTranslation("layout");
  // const {data: session, status} = useSession();
  // const { user, verifiedToken, login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const [loading, setLoading] = React.useState(status == "loading");
  const [error, setError] = React.useState<string>();

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    setError(undefined);

    try {
      //signIn("keycloak") //login(data.username, data.password);
    } catch {
      setError(t("login.errors.unauthorized"));
    }

    setLoading(false);
    if (props.onOk) {
      props.onOk();
    }
  });

  const internalVisible = true //visible ?? (!!session && !!session?.user);
  const hideCancel = visible === undefined;

  return (
    <Modal
      {...props}
      open={internalVisible}
      title={t("login.title")}
      okButtonProps={{ htmlType: "submit", loading }}
      okText={t("login.okButton")}
      cancelButtonProps={{ hidden: hideCancel }}
      cancelText={t("login.cancelButton")}
      onOk={onSubmit}
      closable={false}
    >
      <Styled.Wrapper onSubmit={onSubmit}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: t("login.errors.emptyUsername") },
          }}
          render={({ field }) => (
            <Form.Item
              help={errors.username?.message}
              validateStatus={
                errors.username?.message || error ? "error" : undefined
              }
            >
              <Input
                placeholder={t("login.username")}
                prefix={<UserOutlined />}
                {...field}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item
              help={errors.password?.message || error}
              validateStatus={
                errors.password?.message || error ? "error" : undefined
              }
            >
              <Input
                type="password"
                placeholder={t("login.password")}
                prefix={<LockOutlined />}
                {...field}
              />
            </Form.Item>
          )}
        />
        <input type="submit" hidden />
      </Styled.Wrapper>
    </Modal>
  );
};
