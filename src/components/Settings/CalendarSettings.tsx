import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Calendar,
  Form,
  Input,
  Select,
  Tabs,
  Card,
  Row,
  Col,
  Checkbox,
  DatePicker,
  Modal,
  Tooltip,
  Space,
  message,
} from "antd";
import type { RadioChangeEvent, TabsProps } from "antd";
import CustomInputNumber from "components/CustomInputNumber";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import { UUID } from "crypto";
import {
  Delete,
  GetAllCalendar,
  GetDataFromId,
  Save,
  Update,
} from "@/app/api/services/Calendar/data";

const { TextArea } = Input;

interface Calendar {
  id: UUID;
  calendar: string;
  shortDesc: string;
  longDesc: string;
  createdUser: string;
  modifiedUser: string;
}

export const CalendarSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [fetchData, setFetchData] = useState(true);

  const { t } = useTranslation("layout");
  const { Option } = Select;

  const openModal = () => {
    setValue(value);
    setIsModalOpen(true);
  };

  const clearInputs = () => {
    setFormData({
      id: "",
      family: "",
      plan: "",
      group: "",
    });
  };

  const success = () => {
    message
      .open({
        type: "loading",
        content: "Salvando..",
        duration: 2.5,
      })
      .then(async () => {
        try {
          if (formData.id) {
            await Update(formData);
          } else {
            await Save(formData); 
            clearInputs();
          }
          setFetchData(true);
          message.success("Salvo com sucesso!", 2.5);
        } catch (error) {
          message.error("Não foi possível salvar");
        }
      });
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Calendário?",
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

  const deleteDay = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: t("labels.deleteDays"),
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formStyle = (
    width: string,
    marginRight?: string
  ): React.CSSProperties => ({
    display: "inline-block",
    width: width,
    marginRight: marginRight,
  });

  const onChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    if (selectedValue === 1) {
      setFormData({});
    }
    setValue(selectedValue);
  };

  
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectCalendarChange = async (selectedCalendarId: UUID) => {
    try {
      const selectedCalendar = await GetDataFromId(selectedCalendarId);
      if (selectedCalendar) {
        setFormData({
          ...formData,
          id: selectedCalendar.id,
          calendar: selectedCalendar.ds_Calendar,
          shortDesc: selectedCalendar.ds_Short_Desc,
          longDesc: selectedCalendar.ds_Long_Desc,
          createdUser: selectedCalendar.cd_Audit_Created_User,
          modifiedUser: selectedCalendar.cd_Audit_Modified_User,
        });
      }
      console.log(formData);
    } catch (error) {
      console.error("Erro ao buscar dados do calendário:", error);
    }
  };

  const fetchCalendars = async (setCalendars: any) => {
    try {
      const response = await GetAllCalendar();
      const calendarData = response.result.map(
        (calendar: {
          id: UUID;
          ds_Calendar: string;
          ds_Short_Desc: string;
          ds_Long_Desc: string;
          cd_Audit_Created_User: string;
          cd_Audit_Modified_User: string;
        }) => ({
          id: calendar.id,
          calendar: calendar.ds_Calendar,
          shortDesc: calendar.ds_Short_Desc,
          longDesc: calendar.ds_Long_Desc,
          createdUser: calendar.cd_Audit_Created_User,
          modifiedUser: calendar.cd_Audit_Modified_User,
        })
      );
      setCalendars(calendarData);
    } catch (error) {
      console.error("Erro ao buscar calendários:", error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchCalendars(setCalendars).then(() => setFetchData(false));
    }
  }, [fetchData, setCalendars, setFetchData]);


  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <Form.Item style={{ width: "50%" }} label={t("labels.calendar")}>
          <Select
            style={formStyle("calc(25% - 8px)", "8px")}
            disabled={value === 1}
            onChange={handleSelectCalendarChange}
            value={value === 2 ? formData.calendar : null}
          >
            {calendars.map((calendar) => (
              <Option key={calendar.id} value={calendar.id}>
                {calendar.calendar}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form layout="vertical">
        <Row gutter={5}>
          <Col span={20} style={{ display: "flex" }}>
            <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
              <div style={{ margin: 10 }}>
                <Form.Item
                  style={formStyle("calc(40% - 8px)", "8px")}
                  label={t("labels.days")}
                >
                  <Space.Compact style={{ width: "100%" }}>
                    <Tooltip title={t("labels.removeDays")}>
                      <Button type="primary" onClick={deleteDay}>
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>

                    <Select />

                    <Tooltip title={t("labels.editDays")}>
                      <Button type="primary" onClick={openModal}>
                        <EditOutlined />
                      </Button>
                    </Tooltip>
                  </Space.Compact>
                </Form.Item>
                <Form.Item label=" " style={formStyle("5%")}>
                  <Tooltip title={t("labels.addDays")}>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={openModal}
                      type="primary"
                    ></Button>
                  </Tooltip>
                </Form.Item>

                <Form.Item label={t("labels.name")} style={formStyle("55%")}>
                  <Input
                    value={formData.calendar}
                    onChange={(e) =>
                      handleInputChange("calendar", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Base"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
                <Form.Item
                  label={t("labels.description")}
                  style={formStyle("50%")}
                >
                  <Input
                    value={formData.shortDesc}
                    onChange={(e) =>
                      handleInputChange("shortDesc", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.comments")}
                  style={{ marginBottom: 0 }}
                >
                  <TextArea
                    style={{ resize: "none", height: "99px" }}
                    value={formData.longDesc}
                    onChange={(e) =>
                      handleInputChange("longDesc", e.target.value)
                    }
                  />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={4}>
            <Card style={{ height: 325 }} bodyStyle={{ padding: 0 }}>
              <Calendar fullscreen={false} style={{ color: "red" }} />
            </Card>
          </Col>
        </Row>
        <div style={{ margin: 10, float: "right" }}>
          <DeleteButton onClick={confirmDelete} />
          <SaveButton onClick={success} />
        </div>
      </Form>
      <Modal
        width={1400}
        title={t("titles.settingsDay")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ marginTop: "10px" }} colon={false}>
          <div style={{ display: "flex" }}>
            <Col span={9}>
              <Card title={t("titles.occurrence")} bodyStyle={{ padding: 10 }}>
                <div style={{ width: "100%" }}>
                  <Form.Item label={t("labels.name")}>
                    <Input size="small" />
                  </Form.Item>
                  <Form.Item
                    label={t("lables.date")}
                    style={formStyle("calc(70% - 5px)", "5px")}
                  >
                    <DatePicker
                      size="small"
                      defaultValue={dayjs()}
                      format={"DD/MM/YYYY"}
                      style={formStyle("80%")}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t("labels.elapsedDays")}
                    style={formStyle("calc(23% - 8px)", "8px")}
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card title={t("labels.repeat")} bodyStyle={{ padding: 10 }}>
                <Form.Item style={formStyle("100%")} label="Nunca">
                  <Checkbox />
                </Form.Item>
                <Form.Item style={formStyle("65%")} label="A cada">
                  <CustomInputNumber
                    defaultValue={1}
                    min={1}
                    size="small"
                    style={formStyle("calc(45% - 8px)", "8px")}
                  />
                  <Select
                    defaultValue={"Dia"}
                    options={[
                      { value: "Dia" },
                      { value: "Semana" },
                      { value: "Mês" },
                      { value: "Ano" },
                    ]}
                    style={formStyle("55%")}
                    size="small"
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={9}>
              <Card title={t("labels.termination")} bodyStyle={{ padding: 10 }}>
                <Form.Item style={formStyle("100%")} label="Nunca">
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(50% - 6px)", "6px")}
                  label={t("labels.in")}
                >
                  <DatePicker format={"DD/MM/YYYY"} size="small" />
                </Form.Item>
                <Form.Item label={t("labels.after")} style={formStyle("50%")}>
                  <CustomInputNumber
                    size="small"
                    min={1}
                    style={formStyle("40%", "8px")}
                  />
                  {t("labels.occurrences")}
                </Form.Item>
              </Card>
            </Col>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export const Maintenance = () => {
  return <div> Manutenção </div>;
};

export const PageTabs = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Calendário",
    children: <CalendarSettings />,
  },
  {
    key: "2",
    label: "Manutenção",
    children: <Maintenance />,
  },
];
