import { Button, Card, Col, DatePicker, Form, Modal, Row, Select } from "antd";
import { BarGraph } from "./PcpGraphs";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const { RangePicker } = DatePicker;

const PcpResources: React.FC = () => {
  const { t } = useTranslation("layout");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Filtrar"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("generalButtons.confirmButton")}
        cancelText={t("generalButtons.cancelButton")}
      >
        <Form layout="vertical">
          <Form.Item
            label="Grupos"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 16px 0 0",
            }}
          >
            <Select
              options={[
                { value: "Todos" },
                { value: "Transformador a Seco" },
                { value: "Transformador de Distribuição" },
                { value: "Transformador de Meia Força" },
              ]}
              defaultValue={"Todos"}
            />
          </Form.Item>

          <Form.Item
            label="Recursos"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Select
              defaultValue={"TS - Elétrico - Ruan NÃO USAR"}
              options={[
                { value: "TS - Elétrico - Ruan NÃO USAR" },
                { value: "TS - Elétrico - Rodrigo" },
                { value: "TS - Mecânico - Bruna" },
                { value: "TS - Mecânico - Lucas" },
                { value: "TS - Bobinagem - Vanessa" },
                { value: "TS - Montagem - Felipe" },
                { value: "TS - Elétrico - Isabela" },
                { value: "TS - Mecânico - André" },
                { value: "TS - Bobinagem - João" },
              ]}
            />
          </Form.Item>

          <RangePicker style={{ width: "100%" }} />
        </Form>
      </Modal>

      <Card style={{ height: 740 }}>
        <Button type="primary" onClick={showModal} icon={<SettingOutlined />}>
          Filtrar
        </Button>
        <Col style={{ height: 680 }}>
          <BarGraph />
        </Col>
      </Card>
    </>
  );
};

export default PcpResources;
