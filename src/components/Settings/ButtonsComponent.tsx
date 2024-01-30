import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

const ButtonsComponent: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    marginRight: 5,
  };

  return (
    <div style={{ width: '100%', marginBottom: 10 }}>
      <Tooltip title="Adicionar">
        <Button
          style={buttonStyle}
          type="primary"
          icon={<PlusOutlined />}
        ></Button>
      </Tooltip>
      <Tooltip title="Editar">
        <Button
          style={buttonStyle}
          type="primary"
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
      <Tooltip title="Salvar">
        <Button
          style={buttonStyle}
          type="primary"
          icon={<SaveOutlined />}
        ></Button>
      </Tooltip>
      <Tooltip title="Excluir">
        <Button
          style={buttonStyle}
          type="primary"
          icon={<DeleteOutlined />}
        ></Button>
      </Tooltip>
    </div>
  );
};

export default ButtonsComponent;
