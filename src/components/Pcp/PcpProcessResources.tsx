import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import { DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib";

const { RangePicker } = DatePicker;

import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/es/form/Form";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { UUID } from "crypto";
import {
  GetByFamilyId,
  GetConsumByResourceId,
} from "@/app/api/services/Resource/data";
const weekFormat = "DD/MM/YYYY";

const { TextArea } = Input;

type Family = {
  id: UUID;
  dsFamily: string;
};

type Resource = {
  id: UUID;
  dsResource: string;
};

const PcpProcessResources: React.FC = () => {
  const { t } = useTranslation("layout");
  const [form] = Form.useForm();
  const { Option } = Select;

  const [selectedRadio, setSelectedRadio] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [familys, setFamilys] = useState<Family[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  /* Get all familys */
  const getFamilys = async () => {
    try {
      const response = await GetAllFamily();

      const familyData = response.map(
        (familys: { id: UUID; ds_Family: string }) => ({
          id: familys.id,
          dsFamily: familys.ds_Family,
        })
      );

      setFamilys(familyData);
    } catch (error) {
      console.error("Erro ao buscar familias", error);
    }
  };

  useEffect(() => {
    getFamilys();
  }, []);

  /* Set IDs */
  const handleSelectChange = (key: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  /* Get all resources */
  const getResourceByFamilyId = async () => {
    if (formData.familyId) {
      try {
        const response = await GetByFamilyId(formData.familyId);

        const resourceData = response.map(
          (resources: { id: UUID; ds_Resource: string }) => ({
            id: resources.id,
            dsResource: resources.ds_Resource,
          })
        );
        setResources(resourceData);
      } catch (error) {
        console.error("Não foi possivel carregar recursos", error);
      }
    }
  };

  const getResourceConsumption = async () => {
    const response = await GetConsumByResourceId(formData.resourceId);

    const processIds = response.map(
      (consumption: { process_id: UUID }) => consumption.process_id
    );

    const resourceIds = response.map(
      (consumption: { resource_id: UUID }) => consumption.resource_id
    );

    setFormData((prevData: any) => ({
      ...prevData,
      processId: processIds,
      resourceId: resourceIds,
    }));
  };

  useEffect(() => {
    if (formData.resourceId) {
      getResourceConsumption();

      console.log("Recurso ID:", formData.resourceId);
      console.log("Processo ID:", formData.processId);
    }
  }, [formData.resourceId]);

  /* Render resource */
  useEffect(() => {
    getResourceByFamilyId();
  }, [formData.familyId]);

  /* Log de recursos */
  /*
  useEffect(() => {
    if (resources.length > 0) {
      console.log(resources);
    }
  }, [resources]);
  */

  /*Log recurso id */
  useEffect(() => {
    if (formData.resourceId) {
      console.log(formData.resourceId);
    }
  }, [formData.resourceId]);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedRadio(e.target.value);
  };

  return (
    <Row gutter={15}>
      <Col span={10}>
        <Card
          bodyStyle={{
            padding: 0,
          }}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          <Divider orientation="left">{t("titles.group")}</Divider>
          <div style={{ padding: "5px 10px 5px 10px" }}>
            <Form layout="vertical">
              <Form.Item
                label="Familia"
                style={{
                  width: "calc(50% - 8px)",
                  display: "inline-block",
                  margin: "0px 15px 0 0px",
                }}
              >
                <Select
                  onChange={(value) => handleSelectChange("familyId", value)}
                >
                  {familys.map((family: any) => (
                    <Option key={family.id} value={family.id}>
                      {family.dsFamily}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={t("labels.selectDate")}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <RangePicker style={{ width: "100%" }} format={weekFormat} />
              </Form.Item>
            </Form>
            <div>
              <Radio.Group
                style={{ width: "100%" }}
                onChange={handleRadioChange}
                value={selectedRadio}
              >
                <Radio
                  value={1}
                  style={{ display: "inline-block", width: "calc(51% - 8px)" }}
                >
                  {t("labels.process")}
                </Radio>
                <Radio
                  value={2}
                  style={{ display: "inline-block", width: "calc(49% - 8px)" }}
                >
                  {t("labels.resource")}
                </Radio>
              </Radio.Group>

              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 15px 0 0",
                }}
              >
                <Select
                  placeholder="Selecione o processo"
                  showSearch
                  disabled={selectedRadio === 2}
                ></Select>
              </Form.Item>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <Select
                  placeholder="Selecione o recurso"
                  showSearch
                  disabled={selectedRadio === 1}
                  onChange={(value) => handleSelectChange("resourceId", value)}
                >
                  {resources.map((resources: any) => (
                    <Option key={resources.id} value={resources.id}>
                      {resources.dsResource}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <Form layout="vertical">
                <Form.Item
                  label="Controle"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 15px 0 0",
                  }}
                >
                  <Select />
                </Form.Item>
                <Form.Item
                  label={t("labels.client")}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("labels.quotation")}
                  style={{
                    margin: "0 15px 0 0",
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Select></Select>
                </Form.Item>
                <Form.Item
                  label={t("labels.salesOrder")}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Processo consumido"
                  style={{
                    width: "calc(50% - 8px)",
                    display: "inline-block",
                    margin: "0px 15px 0 0px",
                  }}
                >
                  <Select></Select>
                </Form.Item>
                <Form.Item
                  label="Recurso consumido"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Select></Select>
                </Form.Item>

                <Form.Item
                  label={t("labels.secondsConsum")}
                  style={{
                    width: "calc(50% - 8px)",
                    display: "inline-block",
                    margin: "0px 15px 0 0px",
                  }}
                >
                  <CustomInputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label={t("labels.selectDate")}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <DatePicker style={{ width: "100%" }} format={weekFormat} />
                </Form.Item>
                <Form.Item label={t("labels.notes")}>
                  <TextArea style={{ height: 50, resize: "none" }} />
                </Form.Item>
              </Form>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                  }}
                >
                  {t("generalButtons.newButton")}
                </Button>
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                  }}
                >
                  {t("generalButtons.editButton")}
                </Button>
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                  }}
                >
                  {t("generalButtons.deleteButton")}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={14} style={{ height: 245 }}></Col>
    </Row>
  );
};
export default PcpProcessResources;
