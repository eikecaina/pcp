import { Col, Modal, Row, message } from "antd";
import { DeliveryModal, ItemConfigModal } from "./ItemConfigModal";

interface ConfigModalProps {
  setIsModalConfigOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ setIsModalConfigOpen }) => {
  const handleCancel = () => {
    setIsModalConfigOpen(false);
  };

  const handleOk = () => {
    setIsModalConfigOpen(false);
  };

  return (
    <Modal
      title="Configurações"
      open={true}
      onCancel={handleCancel}
      onOk={handleOk}
      width={990}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <Row gutter={10}>
        <Col span={12} style={{ height: "100%" }}>
          <ItemConfigModal />
        </Col>
        <Col span={12} style={{ height: "100%" }}>
          <DeliveryModal />
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfigModal;
