import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
  Tree,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import {
  ExclamationCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Delete,
  GetAllResource,
  Save,
  Update,
} from "@/app/api/services/Resource/data";
import { UUID } from "crypto";
import { GetAllCalendar } from "@/app/api/services/Calendar/data";
import { TreeFamily, TreeProcess, TreeProcessFamily } from "../TreeData";

import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { TextArea } = Input;

interface Resource {
  id: UUID;
  dsResource: string;
  dsNotes: string;
  cdCalendar: UUID;
  dtAuditCreated: Date;
  cdAuditCreatedUser: string;
  dtAuditModified: Date;
  cdAuditModifiedUser: string;
}

interface Calendar {
  id: UUID;
  calendar: string;
}

const ResourceSettings: React.FC = () => {
  const [value, setValue] = useState(2);
  const [formData, setFormData] = useState<any>([]);
  const [fetchData, setFetchData] = useState(true);
  const [resource, setResource] = useState<Resource[]>([]);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearInputs = () => {
    setFormData({});
  };

  const success = async () => {
    try {
      if (formData.id) {
        await Update(formData);
      } else {
        await Save(formData);
      }
      clearInputs();
      setFetchData(true);
      message.success("Salvo com sucesso!");
    } catch (error) {
      message.error("Não foi possível salvar");
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Valor?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await Delete(formData);
          clearInputs();
          setFetchData(true);
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectCalendarChange = (cdCalendar: any) => {
    setFormData({ ...formData, cdCalendar: cdCalendar });
  };

  const handleSelectResourceChange = (selectedResourceId: any) => {
    const selectedResource = resource.find(
      (resource) => resource.id === selectedResourceId
    );
    if (selectedResource) {
      setFormData({
        ...formData,
        id: selectedResource.id,
        dsResource: selectedResource.dsResource,
        dsNotes: selectedResource.dsNotes,
        cdCalendar: selectedResource.cdCalendar,
      });
    }
    console.log(formData);
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  const fetchResource = async () => {
    try {
      const response = await GetAllResource();
      const resourceData = response.map(
        (resource: {
          id: UUID;
          ds_Resource: string;
          ds_Notes: string;
          cd_Calendar: UUID;
        }) => ({
          id: resource.id,
          dsResource: resource.ds_Resource,
          dsNotes: resource.ds_Notes,
          cdCalendar: resource.cd_Calendar,
        })
      );
      setResource(resourceData);
      console.log(resourceData);
    } catch (error) {
      console.error("Erro ao buscar Recursos: ", error);
    }
  };

  const fetchCalendar = async () => {
    try {
      const response = await GetAllCalendar();
      const calendarData = response.map(
        (calendar: { id: UUID; ds_Calendar: string }) => ({
          id: calendar.id,
          calendar: calendar.ds_Calendar,
        })
      );
      setCalendars(calendarData);
    } catch (error) {}
  };

  useEffect(() => {
    if (fetchData) {
      fetchResource().then(() => setFetchData(false));
    }
  }, [fetchData]);

  useEffect(() => {
    if (fetchData) {
      fetchCalendar().then(() => setFormData(false));
    }
  }, [fetchData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { t } = useTranslation("layout");
  return (
    <>
      <div style={{ display: "flex" }}>
        <Form.Item style={{ width: "50%" }} label={t("labels.resource")}>
          <Select
            onChange={handleSelectResourceChange}
            style={formStyle("calc(50%)")}
            value={value === 1 ? null : formData.group}
            disabled={value === 1}
          >
            {resource.map((resource) => (
              <Option value={resource.id} key={resource.id}>
                {resource.dsResource}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
        <Form layout="vertical">
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                style={formStyle("calc(33.33% - 5px)", "5px")}
                label={t("labels.name")}
              >
                <Input
                  disabled={value === 2}
                  value={formData.dsResource}
                  onChange={(e) =>
                    handleInputChange("dsResource", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(32.90% - 8px)",
                  margin: "0 8px",
                }}
                label="Disponibilidade Diária"
              >
                <Space.Compact style={{ width: "100%" }}>
                  <Select />
                  <Tooltip title="Adicionar Item">
                    <Button onClick={showModal} type="primary">
                      <PlusOutlined />
                    </Button>
                  </Tooltip>
                </Space.Compact>
              </Form.Item>

              <Form.Item
                style={formStyle("calc(33.33%)")}
                label={t("labels.calendar")}
              >
                <Select
                  disabled={value === 2}
                  value={formData.cdCalendar}
                  onChange={handleSelectCalendarChange}
                >
                  {calendars.map((calendar) => (
                    <Option key={calendar.id} value={calendar.id}>
                      {calendar.calendar}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100%)")}
                label={t("labels.description")}
              >
                <TextArea
                  disabled={value === 2}
                  style={{ height: 100, resize: "none" }}
                  value={formData.dsNotes}
                  onChange={(e) => handleInputChange("dsNotes", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card
                title="Famílias que o recurso está disponivel"
                bodyStyle={{ padding: 10 }}
              >
                <div
                  style={{
                    height: "220px",
                    overflowX: "auto",
                  }}
                >
                  <TreeProcessFamily
                    setFormData={setFormData}
                    fetchData={fetchData}
                    setFetchData={setFetchData}
                  />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bodyStyle={{ padding: 10 }}
                title="Processos que consomem o recurso"
              >
                <div
                  style={{
                    height: "220px",
                    overflowX: "auto",
                  }}
                >
                  <TreeProcess
                    setFormData={setFormData}
                    fetchData={fetchData}
                    setFetchData={setFetchData}
                  />
                </div>
              </Card>
            </Col>
          </Row>
          <div style={{ margin: 10, float: "right" }}>
            <NewButton onClick={newFunction} />
            <EditButton onClick={editFunction} />
            <DeleteButton onClick={confirmDelete} />
            <SaveButton onClick={success} />
          </div>
        </Form>
      </Card>

      <Modal
        title="Disponibilidade"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1090}
        okText={t("generalButtons.openButton")}
        cancelText={t("generalButtons.cancelButton")}
      >
        <Form.Item
          colon={false}
          style={formStyle("calc(33.33% - 5px)", "5px")}
          label="Disponibilidade Diária"
        >
          <Input />
        </Form.Item>
        <Form.Item
          colon={false}
          style={formStyle("calc(33.33% - 5px)", "5px")}
          label=" "
        >
          <Select />
        </Form.Item>

        <Form.Item
          colon={false}
          style={formStyle("calc(33.33% - 5px)", "5px")}
          label=" "
        >
          <RangePicker style={{ width: "100%" }} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ResourceSettings;
