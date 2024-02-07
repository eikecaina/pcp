import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Tooltip,
} from "antd";
import React, { FormEventHandler, MouseEventHandler, useState } from "react";

interface RadioValue {
  value: number;
  onChange?: (e: RadioChangeEvent) => void;
  type?: string;
  style?: React.CSSProperties;
}

interface Buttons {
  onChange?: FormEventHandler;
  onClick?: MouseEventHandler;
}
const buttonStyle: React.CSSProperties = {
  marginRight: 5,
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
      >Excluir</Button>
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
      >Salvar</Button>
    </Tooltip>
  );
};

export const RadioButtons: React.FC<RadioValue> = ({
  value: value,
  onChange: onChange,
}) => {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      defaultValue={1}
      optionType="button"
      buttonStyle="solid"
      style={{ marginBottom: 10 }}
    >
      <Radio value={1}>Novo</Radio>
      <Radio value={2}>Editar</Radio>
    </Radio.Group>
  );
};

export const SelectRadio: React.FC<RadioValue> = ({
  value: value,
  type: type,
  style: style,
}) => {
  return (
    <>
      {value === 1 ? (
        <>
          {type === "Grupo" && (
            <Form.Item label="Grupo" style={style}>
              <Select disabled />
            </Form.Item>
          )}
          {type === "Lista" && (
            <Form.Item label="Lista" style={style}>
              <Select disabled />
            </Form.Item>
          )}
          {type === "Calendário" && (
            <Form.Item label="Calendários" style={style}>
              <Select disabled />
            </Form.Item>
          )}
        </>
      ) : null}
      {value === 2 ? (
        <>
          {type === "Grupo" && (
            <Form.Item label="Grupo" style={style}>
              <Select />
            </Form.Item>
          )}
          {type === "Lista" && (
            <Form.Item label="Lista" style={style}>
              <Select />
            </Form.Item>
          )}
          {type === "Calendário" && (
            <Form.Item label="Calendários" style={style}>
              <Select />
            </Form.Item>
          )}
        </>
      ) : null}
    </>
  );
};
