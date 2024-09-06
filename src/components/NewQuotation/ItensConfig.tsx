import {
  CalendarOutlined,
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
import React, { useState } from "react";

import ConfigModal from "./ConfigModal/ConfigModal";
import PcpPage from "components/Pcp/PcpPage";
import SearchQuotation from "./OpenQuotation/SearchQuotation";
import { useTranslation } from "react-i18next";

import PlanningMap from "components/MapQuotation/PlanningMap";
import GeneralSettings from "components/Settings/GeneralSettings";

import { TreeValues } from "../TreeData";

export const GeneralData: React.FC = () => {
  const [fetchData, setFetchData] = useState(true);
  const [selectOptions, setSelectOptions] = useState([{ value: "10" }]);
  const [selectedItem, setSelectedItem] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    quotation_Item: [
      {
        cd_Quotation_Item: 10,
        config_Item: [{ value: "" }],
      },
    ],
  });

  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const addOptions = () => {
    const lastOptionValue =
      selectOptions.length > 0
        ? parseInt(selectOptions[selectOptions.length - 1].value, 10)
        : 0;
    const newItemValue = lastOptionValue + 10;

    const newQuotationItem = {
      cd_Quotation_Item: newItemValue,
      config_Item: [{ value: formData.value }],
    };

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      quotation_Item: [...prevFormData.quotation_Item, newQuotationItem],
    }));

    setSelectedItem(newItemValue);
    message.success("Item Criado");
  };

  const logJson = () => {
    const data = {
      id: "5f94a967-8f26-4531-aaf8-b431f0a679e8",
      ds_Quotation: formData.ds_Quotation,
      ds_Customer: formData.ds_Customer,
      ds_Ov: formData.ds_Ov,
      quotation_Item: formData.quotation_Item.map(
        (item: any, index: number) => ({
          ...item,
          config_Item: item.config_Item.map(
            (config: any, configIndex: number) => ({
              value: formData.value_id,
            })
          ),
        })
      ),
    };

    console.log(data);
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

  const { t } = useTranslation("layout");

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

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <>
      <div style={{ height: "100%" }}>
        <Row style={{ padding: 10 }}>
          <Form layout="vertical">
            <Form.Item
              name="item"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
              label={t("labels.quotation")}
            >
              <Space.Compact style={{ width: "100%" }}>
                <InputNumber
                  style={{ width: "100%" }}
                  name="ds_Quotation"
                  value={formData.ds_Quotation}
                  onChange={(e) => handleInputChange("ds_Quotation", e)}
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
                  <Button disabled type="primary" onClick={removeOption}>
                    <MinusOutlined />
                  </Button>
                </Tooltip>

                <Select
                  defaultValue={selectedItem}
                  onChange={(value) =>
                    handleInputChange("cd_Quotation_Item", value)
                  }
                  options={selectOptions}
                />
                <Tooltip title="Adicionar Item">
                  <Button disabled type="primary" onClick={addOptions}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              </Space.Compact>
            </Form.Item>

            <Form.Item
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              label={t("labels.client")}
            >
              <Input
                name="ds_Customer"
                onChange={(e) =>
                  handleInputChange("ds_Customer", e.target.value)
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
            >
              <InputNumber
                name="ds_Ov"
                value={formData.ds_Ov}
                onChange={(e) => handleInputChange("ds_Ov", e)}
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
            <TreeValues
              checkable
              fetchData={fetchData}
              setFetchData={setFetchData}
              setFormData={setFormData}
            />
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
            onClick={logJson}
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
function uuidv4() {
  throw new Error("Function not implemented.");
}
