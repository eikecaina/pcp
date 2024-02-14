import {
  CalendarOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Drawer,
  FloatButton,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import React, { useState } from "react";

import ConfigModal from "./ConfigModal/ConfigModal";
import PcpPage from "components/Pcp/PcpPage";
import SearchQuotation from "./OpenQuotation/SearchQuotation";
import { useTranslation } from "next-i18next";
import CustomInputNumber from "components/CustomInputNumber";
import PlanningMap from "components/MapQuotation/PlanningMap";
import GeneralSettings from "components/Settings/GeneralSettings";

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
  const { t } = useTranslation("layout");
  return (
    <Row style={{ padding: 10 }}>
      <Form layout="vertical">
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
          label={t("labels.client")}
          rules={[{ required: true, message: "Por favor, insira o Cliente!" }]}
        >
          <Space.Compact style={{ width: "100%" }}>
            <Input />
            <Tooltip title="Abrir Cotação">
              <Button
                type="primary"
                style={{ borderRadius: 3 }}
                onClick={handleOpenModal}
              >
                <SearchOutlined />
              </Button>
            </Tooltip>
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
          label={t("labels.item")}
        >
          <Space.Compact style={{ width: "100%" }}>
            <Tooltip title="Remover Item">
              <Button type="primary" onClick={confirmDelete}>
                <MinusOutlined />
              </Button>
            </Tooltip>

            <Select
              value={selectedItem}
              onChange={(value) => setSelectedItem(value)}
              options={selectOptions}
            />
            <Tooltip title="Adicionar Item">
              <Button type="primary" onClick={addOptions}>
                <PlusOutlined />
              </Button>
            </Tooltip>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          label={t("labels.quotation")}
        >
          <CustomInputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
          label={t("labels.salesOrder")}
        >
          <CustomInputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Row>
  );
};

export const ProductConfig: React.FC = () => {
  const { t } = useTranslation("layout");

  const [showPower, setShowPower] = useState(false);
  const [showVoltage, setShowVoltage] = useState(false);
  const [showMaterial, setShowMaterial] = useState(false);
  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

  const openModalConfig = () => {
    setIsModalConfigOpen(true);
  };

  const handleOperetion = (value: string) => {
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
        {t("titles.productConfig")}
      </Divider>
      <div style={{ overflowY: "auto", padding: 10, maxHeight: "40vh" }}>
        <Form layout="vertical">
          <Form.Item colon={false} label={t("labels.operation")}>
            <Select
              options={[{ value: "Óleo" }, { value: "Seco" }]}
              onChange={handleOperetion}
            />
          </Form.Item>
          {showPower && (
            <Form.Item label="Potência em kVA" style={{ width: "100%" }}>
              <Select
                options={[{ value: "0 a 15" }]}
                onChange={handleOperetion}
              />
            </Form.Item>
          )}
          {showVoltage && (
            <Form.Item label="Classe de tensão">
              <Select
                options={[{ value: "15 a 36" }]}
                onChange={handleOperetion}
              />
            </Form.Item>
          )}
          {showMaterial && (
            <Form.Item label="Materiais críticos">
              <Select options={[{ value: "Bucha" }]} />
            </Form.Item>
          )}
        </Form>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          bottom: 7,
        }}
      >
        <Button
          style={{ width: "24%" }}
          onClick={openModalConfig}
          type="primary"
        >
          {t("generalButtons.configButton")}
        </Button>
        <Button style={{ width: "24%" }} type="primary">
          {t("generalButtons.calcButton")}
        </Button>
        <Button style={{ width: "24%" }} type="primary">
          Consumir
        </Button>
        <Button style={{ width: "24%" }} type="primary">
          {t("generalButtons.saveButton")}
        </Button>
      </div>

      {isModalConfigOpen && (
        <ConfigModal setIsModalConfigOpen={setIsModalConfigOpen} />
      )}
    </>
  );
};

export const FloatMenu: React.FC = () => {
  const [isDrawerVisiblePcp, setIsDrawerVisiblePcp] = useState(false);
  const [isDrawerVisibleGeneralConfig, setIsDrawerVisibleGeneralConfig] =
    useState(false);
  const [isModalMapOpen, setIsModalMapOpen] = useState(false);
  const { t } = useTranslation("layout");

  const openDrawerPcp = () => {
    setIsDrawerVisiblePcp(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisiblePcp(false);
  };
  const openDrawerConfig = () => {
    setIsDrawerVisibleGeneralConfig(true);
  };

  const closeDrawerConfig = () => {
    setIsDrawerVisibleGeneralConfig(false);
  };

  const openModalMap = () => {
    setIsModalMapOpen(true);
  };

  const closeModalMap = () => {
    setIsModalMapOpen(false);
  };

  return (
    <>
      <FloatButton.Group
        trigger="hover"
        icon={<MenuOutlined />}
        style={{ right: 50, bottom: 90 }}
      >
        <FloatButton
          tooltip={<div>Mapa de Planejamento</div>}
          type="default"
          icon={<FileOutlined />}
          onClick={openModalMap}
        />
        <FloatButton
          tooltip={<div>PCP</div>}
          type="default"
          icon={<CalendarOutlined />}
          onClick={openDrawerPcp}
        />
        <FloatButton
          tooltip={<div> Configuração Geral</div>}
          type="default"
          icon={<SettingOutlined />}
          onClick={openDrawerConfig}
        />
      </FloatButton.Group>

      <Drawer
        width={"100%"}
        title="PCP"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisiblePcp}
      >
        <PcpPage />
      </Drawer>
      <Drawer
        width={"100%"}
        title="Configuração Geral"
        placement="right"
        onClose={closeDrawerConfig}
        open={isDrawerVisibleGeneralConfig}
      >
        <GeneralSettings />
      </Drawer>
      <Modal
        title="Mapa de Planejamento"
        width={"1000px"}
        open={isModalMapOpen}
        onCancel={closeModalMap}
        okText={t("generalButtons.confirmButton")}
        cancelText={t("generalButtons.cancelButton")}
      >
        <PlanningMap />
      </Modal>
    </>
  );
};
