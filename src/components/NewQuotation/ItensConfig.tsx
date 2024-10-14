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
  Radio,
  RadioChangeEvent,
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

import { TreeQuotation } from "../TreeData";
import { UUID } from "crypto";

type QuotationItem = {
  quotation_Value: number;
  config_Item: {
    value: UUID[];
  };
};

export const GeneralData: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [fetchData, setFetchData] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rootId, setRootId] = useState();
  const [formData, setFormData] = useState<any>({
    quotation_Items: [
      {
        quotation_Value: 10,
        config_Item: {
          value: [],
        },
      },
    ],
  });

  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const findNextAvailableValue = (
    items: QuotationItem[],
    step: number = 10
  ) => {
    const existingValues = items.map((item) => item.quotation_Value);
    let nextValue = step;

    while (existingValues.includes(nextValue)) {
      nextValue += step;
    }

    return nextValue;
  };

  const sortQuotationItems = (items: QuotationItem[]) => {
    return items.sort((a, b) => a.quotation_Value - b.quotation_Value);
  };

  const addOptions = () => {
    const nextValue = findNextAvailableValue(formData.quotation_Items, 10);

    const newItem: QuotationItem = {
      quotation_Value: nextValue,
      config_Item: {
        value: [],
      },
    };

    setFormData((prevData: { quotation_Items: any }) => {
      const updatedItems = [...prevData.quotation_Items, newItem];

      const sortedItems = sortQuotationItems(updatedItems);

      setSelectedIndex(sortedItems.length - 1);

      return {
        ...prevData,
        quotation_Items: sortedItems,
      };
    });

    message.success(`Item adicionado`);
  };

  const removeOption = () => {
    if (selectedIndex !== null) {
      // Atualiza o estado com setFormData
      setFormData((prevData: { quotation_Items: QuotationItem[] }) => {
        // Filtra os items que não estão no índice a ser removido
        const newItems = prevData.quotation_Items.filter(
          (_, i: number) => i !== selectedIndex
        );

        // Ordena os itens após a remoção
        const sortedItems = sortQuotationItems(newItems);

        // Atualiza o índice selecionado
        const newIndex =
          sortedItems.length > 0
            ? Math.min(selectedIndex, sortedItems.length - 1)
            : null;

        // Atualiza o selectedIndex para o novo valor
        setSelectedIndex(newIndex);

        // Atualiza o estado do setData para manter sincronizado
        setData((prevState: any) => ({
          ...prevState,
          quotation_Items: sortedItems,
        }));

        // Retorna o novo estado do setFormData
        return {
          ...prevData,
          quotation_Items: sortedItems,
        };
      });

      // Exibe uma mensagem de sucesso
      message.success("Item excluído com sucesso");
    } else {
      // Exibe uma mensagem de erro se nenhum item foi selecionado
      message.error("Selecione um item para excluir");
    }
  };

  const generateOptions = (quotationItems: { quotation_Value: any }[]) => {
    const uniqueItems = Array.from(
      new Set(quotationItems.map((item) => item.quotation_Value))
    ).map((value) => {
      return quotationItems.find((item) => item.quotation_Value === value);
    });

    const filteredItems = uniqueItems.filter(
      (item): item is { quotation_Value: any } => item !== undefined
    );

    return filteredItems.map(
      (item: { quotation_Value: any }, index: number) => ({
        value: item.quotation_Value,
        label: item.quotation_Value,
        index,
      })
    );
  };

  const updateQuotationItemValue = (index: number, newValue: string) => {
    setData((prevData: any) => {
      const updatedData = {
        ...prevData,
        id: "5f94a967-8f26-4531-aaf8-b431f0a679e8",
        ds_Quotation: formData.ds_Quotation,
        ds_Customer: formData.ds_Customer,
        ds_Ov: formData.ds_Ov,
        quotation_Items: prevData.quotation_Items
          ? [...prevData.quotation_Items]
          : [],
      };

      if (!updatedData.quotation_Items[index]) {
        updatedData.quotation_Items[index] = {
          quotation_Value:
            formData.quotation_Items[index]?.quotation_Value || 10,
          config_Item: { value: [newValue] },
        };
      } else {
        updatedData.quotation_Items[index].config_Item.value = [newValue];
      }

      return updatedData;
    });
  };

  const saveLog = () => {
    updateQuotationItemValue(selectedIndex ?? 0, formData.value_id);

    console.log(data);
  };

  const openModalConfig = async () => {
    setIsModalConfigOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setRootId(e.target.value);
    setFetchData(true);
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

    const options = generateOptions(formData.quotation_Items);

    const selectedOption = options.find(
      (option: { value: any }) => option.value === value
    );

    if (selectedOption) {
      const index = options.indexOf(selectedOption);
      setSelectedIndex(index);

      console.log("Posição atual do select:", index, value);

      const selectedQuotationItem = formData.quotation_Items.find(
        (item: { quotation_Value: number }) => item.quotation_Value === value
      );

      if (selectedQuotationItem) {
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          value_id: selectedQuotationItem.config_Item.value,
        }));
      }
    }
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
                  <Button type="primary" onClick={removeOption}>
                    <MinusOutlined />
                  </Button>
                </Tooltip>

                <Select
                  defaultValue={
                    generateOptions(formData.quotation_Items)[0]?.value
                  }
                  value={
                    selectedIndex !== null
                      ? generateOptions(formData.quotation_Items)[selectedIndex]
                          ?.value
                      : undefined
                  }
                  onChange={(value) =>
                    handleInputChange("quotation_Item", value)
                  }
                  options={generateOptions(formData.quotation_Items)}
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
            <Radio.Group
              defaultValue={"d782616f-44fb-493c-9bfa-e85b5c1c471a"}
              onChange={onChange}
              value={rootId}
            >
              <Radio value={"d782616f-44fb-493c-9bfa-e85b5c1c471a"}>
                Meio de Operação: Seco
              </Radio>

              <Radio value={"0e628b8a-bdc9-4bd7-999a-a7a5a3166372"}>
                Meio de Operação: Óleo
              </Radio>
            </Radio.Group>

            <div style={{ marginTop: 20 }}>
              <TreeQuotation
                checkable
                fetchData={fetchData}
                setFetchData={setFetchData}
                setFormData={setFormData}
                rootId={rootId}
              />
            </div>
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
            onClick={saveLog}
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
