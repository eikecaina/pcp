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
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import React, { ChangeEvent, useState } from "react";

import ConfigModal from "./ConfigModal/ConfigModal";
import PcpPage from "components/Pcp/PcpPage";
import SearchQuotation from "./OpenQuotation/SearchQuotation";
import { useTranslation } from "react-i18next";
import CustomInputNumber from "components/CustomInputNumber";
import PlanningMap from "components/MapQuotation/PlanningMap";
import GeneralSettings from "components/Settings/GeneralSettings";
import { saveDataForm } from "@/app/api/services/Example/apiUtils";

import dayjs from "dayjs";
import { TreeValues } from "../TreeData";

interface FormData {
  ds_Customer: string;
  ds_Quotation: number | null;
  ds_Ov: number | null;
  dt_Created: string;
  user: string;
}

export const GeneralData: React.FC = () => {
  const [selectOptions, setSelectOptions] = useState([{ value: "10" }]);
  const [selectedItem, setSelectedItem] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPower, setShowPower] = useState(false);
  const [showVoltage, setShowVoltage] = useState(false);
  const [showMaterial, setShowMaterial] = useState(false);
  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);
  const [formValid, setValidForm] = useState(false);
  const [alertInput, setAlertInput] = useState(true);

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

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: t("labels.deleteDays"),
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
    });
  };

  const removeOption = () => {
    if (selectOptions.length === 0) {
      message.error("Nenhum item para excluir");
      return;
    }

    const newOptions = selectOptions.slice(0, -1);
    const newSelectedItem: any =
      newOptions.length > 0
        ? parseInt(newOptions[newOptions.length - 1].value)
        : null;

    setSelectOptions(newOptions);
    setSelectedItem(newSelectedItem);
    message.success("Item Excluído");
  };

  const openModalConfig = async () => {
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

  const { t } = useTranslation("layout");

  const [formData, setFormData] = useState<FormData>({
    user: "e-eike",
    ds_Customer: "",
    ds_Quotation: null,
    ds_Ov: null,
    dt_Created: dayjs().format("DD/MM/YYYY"),
  });

  const handleSaveClick = async (id: any) => {
    setValidForm(true);
    if (
      formData.ds_Customer !== "" &&
      formData.ds_Quotation !== null &&
      formData.ds_Ov !== null
    ) {
      const success = await saveDataForm(id, formData);
      if (success) {
        setFormData({
          user: "e-eike",
          ds_Customer: "",
          ds_Quotation: null,
          ds_Ov: null,
          dt_Created: dayjs().format("DD/MM/YYYY"),
        });
        setValidForm(false);
        message.success("Nova cotação criada");
      }
    } else {
      setAlertInput(false);
      message.info("Preencha os campos");
    }
  };

  const handleRowSelect = (selectedData: any[]) => {
    if (selectedData && selectedData.length > 0) {
      const selectedRowData = selectedData[0];
      setFormData({
        user: selectedRowData.user || "",
        ds_Customer: selectedRowData.ds_Customer || "",
        ds_Quotation: selectedRowData.ds_Quotation || null,
        ds_Ov: selectedRowData.ds_Ov || null,
        dt_Created: selectedRowData.dt_Created || "",
      });
    }
  };

  const handleInputChange = (name: string, value: string | number | null) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div style={{ height: "100%" }}>
        <Row style={{ padding: 10 }}>
          <Form layout="vertical">
            <Form.Item
              name="item"
              required
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
              label={t("labels.client")}
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  name="ds_Customer"
                  value={formData.ds_Customer}
                  onChange={(e) =>
                    handleInputChange("ds_Customer", e.target.value)
                  }
                />
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
                  onRowSelect={handleRowSelect}
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
                  <Button type="primary" onClick={removeOption}>
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
              required
            >
              <InputNumber
                name="ds_Quotation"
                value={formData.ds_Quotation}
                onChange={(value) =>
                  typeof value === "number"
                    ? handleInputChange("ds_Quotation", value)
                    : handleInputChange("ds_Quotation", null)
                }
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
              label={t("labels.salesOrder")}
              required
            >
              <CustomInputNumber
                name="ds_Ov"
                value={formData.ds_Ov}
                onChange={(value) =>
                  typeof value === "number"
                    ? handleInputChange("ds_Ov", value)
                    : handleInputChange("ds_Ov", null)
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Row>
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
            {t("generalButtons.consumeButton")}
          </Button>
          <Button
            htmlType="submit"
            onClick={handleSaveClick}
            style={{ width: "24%" }}
            type="primary"
          >
            {t("generalButtons.saveButton")}
          </Button>
        </div>

        {isModalConfigOpen && (
          <ConfigModal setIsModalConfigOpen={setIsModalConfigOpen} />
        )}
      </div>
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
          tooltip={<div>{t("titles.planningMap")}</div>}
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
          tooltip={<div>{t("titles.generalSettings")}</div>}
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
        title={t("titles.generalSettings")}
        placement="right"
        onClose={closeDrawerConfig}
        open={isDrawerVisibleGeneralConfig}
      >
        <GeneralSettings />
      </Drawer>
      <Modal
        title={t("titles.planningMap")}
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
