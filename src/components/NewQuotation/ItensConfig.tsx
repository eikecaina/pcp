import {
  CalendarOutlined,
  ExclamationCircleOutlined,
  FolderOpenOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Drawer,
  FloatButton,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import React, { useState } from "react";

import ConfigModal from "./ConfigModal/ConfigModal";
import PcpPage from "components/Pcp/PcpPage";
import SearchQuotation from "./OpenQuotation/SearchQuotation";

export const GeneralData: React.FC = () => {
  const [selectOptions, setSelectOptions] = useState([{ value: "10" }]);
  const [selectedItem, setSelectedItem] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const addOptions = () => {
    const lastOptionValue = parseInt(
      selectOptions[selectOptions.length - 1].value,
      10
    );
    const newOptions = Array.from({ length: 1 }, (_, index) => ({
      value: `${lastOptionValue + (index + 1) * 10}`,
    }));

    setSelectedItem(parseInt(newOptions[newOptions.length - 1].value));
    setSelectOptions((prevOptions) => [...prevOptions, ...newOptions]);
    message.success("Item Criado");
  };

  const removeOptions = () => {
    if (selectOptions.length > 1) {
      const newOptions = selectOptions.filter((object) => {
        return object.value !== selectedItem.toString();
      });

      setSelectOptions(newOptions);
      setSelectedItem(parseInt(newOptions[0].value));

      message.error("Item Excluído");
    } else {
      message.warning("Não é possível remover mais itens.");
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Excluir?",
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Item?",
      okText: "Confirmar",
      cancelText: "Cancelar",
      onOk: removeOptions,
    });
  };

  return (
    <Row style={{ padding: 10 }}>
      <Form layout="vertical">
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
          label="Cliente"
          name="cliente"
          rules={[{ required: true, message: "Por favor, insira o Cliente!" }]}
        >
          <Space.Compact style={{ width: "100%" }}>
            <Input />
            <Button style={{ borderRadius: 3 }} onClick={handleOpenModal}>
              <SearchOutlined />
            </Button>
            <SearchQuotation
              isModalOpen={isModalOpen}
              setModalIsOpen={setIsModalOpen}
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
          label="Item"
          name="item"
          rules={[{ required: true, message: "Por favor, selecione o Item!" }]}
        >
          <Space.Compact style={{ width: "100%" }}>
            <Button type="primary" onClick={addOptions}>
              <PlusOutlined />
            </Button>
            <Select
              value={selectedItem}
              onChange={(value) => setSelectedItem(value)}
              options={selectOptions}
            />
            <Button type="primary" onClick={confirmDelete}>
              <MinusOutlined />
            </Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          label="Cotação"
          name="cotacao"
          rules={[{ required: true, message: "Por favor, insira a Cotação!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
          label="ODV"
          name="odv"
          rules={[{ required: true, message: "Por favor, insira o ODV!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Row>
  );
};

export const ProductConfig: React.FC = () => {
  const [showPower, setShowPower] = useState(false);
  const [showVoltage, setShowVoltage] = useState(false);
  const [showMaterial, setShowMaterial] = useState(false);
  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

  const openModalConfig = () => {
    setIsModalConfigOpen(true);
  };

  const handleOperetion = (value) => {
    if (value === "Óleo") {
      setShowPower(true);
    } else if (value === "0 a 15") {
      setShowVoltage(true);
    } else if (value === "15 a 36") {
      setShowMaterial(true);
    }
  };

  return (
    <>
      <Divider orientation="left" style={{ marginTop: "10px 0 0px 0" }}>
        Configuração de produto
      </Divider>
      <div style={{ overflowY: "auto", marginBottom: 50, padding: 10 }}>
        <Form layout="vertical">
          <Form.Item colon={false} label="Meio de operação">
            <Select
              style={{ width: "100%", maxWidth: 350 }}
              options={[{ value: "Óleo" }, { value: "Seco" }]}
              onChange={handleOperetion}
            />
          </Form.Item>
          {showPower && (
            <Form.Item label="Potência em kVA" style={{ width: "100%" }}>
              <Select
                style={{ width: "100%", maxWidth: 350 }}
                options={[{ value: "0 a 15" }]}
                onChange={handleOperetion}
              />
            </Form.Item>
          )}
          {showVoltage && (
            <Form.Item label="Classe de tensão">
              <Select
                style={{ width: "100%", maxWidth: 350 }}
                options={[{ value: "15 a 36" }]}
                onChange={handleOperetion}
              />
            </Form.Item>
          )}
          {showMaterial && (
            <Form.Item label="Materiais críticos">
              <Select
                style={{ width: "100%", maxWidth: 350 }}
                options={[{ value: "Bucha" }]}
              />
            </Form.Item>
          )}
        </Form>
      </div>

      <Button
        style={{
          position: "absolute",
          bottom: 0,
          right: 5,
          margin: 7,
          justifyContent: "space-between",
        }}
        type="primary"
      >
        Calcular
      </Button>

      <Button
        style={{
          position: "absolute",
          bottom: 0,
          left: 5,
          margin: 7,
          justifyContent: "space-between",
        }}
        onClick={openModalConfig}
        type="primary"
      >
        Configuração
      </Button>
      {isModalConfigOpen && (
        <ConfigModal setIsModalConfigOpen={setIsModalConfigOpen} />
      )}
    </>
  );
};

export const FloatMenu: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        icon={<FolderOpenOutlined />}
        style={{ right: 50, bottom: 90 }}
      >
        <FloatButton
          tooltip={<div>PCP</div>}
          type="default"
          icon={<CalendarOutlined />}
          onClick={openDrawer}
        />
      </FloatButton.Group>

      <Drawer
        width={"100%"}
        title="PCP"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
      >
        <PcpPage />
      </Drawer>
    </>
  );
};
