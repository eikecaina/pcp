import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { FormEventHandler, MouseEventHandler } from "react";

interface Buttons {
  onChange?: FormEventHandler;
  onClick?: MouseEventHandler;
}
const buttonStyle: React.CSSProperties = {
  marginRight: 5,
};

export const NewButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  return (
    <Tooltip title="Adicionar">
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<PlusOutlined />}
      />
    </Tooltip>
  );
};

export const EditButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  return (
    <Tooltip title="Editar">
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<EditOutlined />}
      />
    </Tooltip>
  );
};

export const DeleteButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  return (
    <Tooltip title="Excluir">
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<DeleteOutlined />}
      />
    </Tooltip>
  );
};

export const SaveButton: React.FC<Buttons> = ({
  onChange: onChange,
  onClick: onClick,
}) => {
  return (
    <Tooltip title="Salvar">
      <Button
        onChange={onChange}
        onClick={onClick}
        style={buttonStyle}
        type="primary"
        icon={<SaveOutlined />}
      />
    </Tooltip>
  );
};
