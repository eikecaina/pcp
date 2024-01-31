import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

interface Buttons {
  new: boolean;
  edit: boolean;
  delete: boolean;
  save: boolean;
}

const ButtonsComponent: React.FC<Buttons> = ({
  new: showNew,
  edit: showEdit,
  delete: showDelete,
  save: showSave,
}) => {
  const buttonStyle: React.CSSProperties = {
    marginRight: 5,
  };

  return (
    <div style={{ width: "100%", marginBottom: 10 }}>
      {showNew && (
        <Tooltip title="Adicionar">
          <Button style={buttonStyle} type="primary" icon={<PlusOutlined />} />
        </Tooltip>
      )}
      {showEdit && (
        <Tooltip title="Editar">
          <Button style={buttonStyle} type="primary" icon={<EditOutlined />} />
        </Tooltip>
      )}
      {showDelete && (
        <Tooltip title="Excluir">
          <Button style={buttonStyle} type="primary" icon={<DeleteOutlined />} />
        </Tooltip>
      )}
      {showSave && (
        <Tooltip title="Salvar">
          <Button style={buttonStyle} type="primary" icon={<SaveOutlined />} />
        </Tooltip>
      )}
    </div>
  );
};

export default ButtonsComponent;
