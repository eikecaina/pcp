import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from "antd";

import { ChangeEvent, useEffect, useState } from "react";
import { FileExcelOutlined } from "@ant-design/icons";

import { exportToExcel } from "components/ExportExcel";
import { useTranslation } from "react-i18next";
import { MixedGraph } from "../MixedGraph";
import { UUID } from "crypto";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { formStyle } from "../Settings/Style";
import { GetByFamilyId } from "@/app/api/services/Resource/data";
import { GetDataFromId } from "@/app/api/services/Resource/data";
import { GetDataDaysFromId } from "@/app/api/services/Calendar/data";
import {
  checkDatesRange,
  createVlTimeArray,
  formatDate,
  isWorkDay,
} from "../utilsDays";

const { Option } = Select;

interface Family {
  id: UUID;
  family: string;
}

interface Resource {
  id: UUID;
  ds_Resource: string;
  calendar: UUID;
}

const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
  const { t } = useTranslation("layout");
  const [formData, setFormData] = useState<any>({});
  const [selectedRadio, setSelectedRadio] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [familys, setFamilys] = useState<Family[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [dates, setDates] = useState([]);
  const [time, setTime] = useState<any[]>([]);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedRadio(e.target.value);
    setResources([]);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevData: any) => ({ ...prevData, [fieldName]: value }));
  };

  const handleExport = () => {
    exportToExcel(inputValue);
  };

  const getDatesInRange = (start: Date, end: Date): string[] => {
    const datesArray: string[] = [];
    let currentDate = new Date(start);
    end = new Date(end);

    while (currentDate <= end) {
      datesArray.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  };

  const handleChangeDate = (selectedDays: any[]) => {
    if (selectedDays && selectedDays[0] && selectedDays[1]) {
      const [startDate, endDate] = selectedDays;
      const allDates: any = getDatesInRange(
        startDate.toDate(),
        endDate.toDate()
      );
      console.log("Datas:", allDates);

      setDates(allDates);
    } else {
      setDates([]);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleExport();
    setInputValue("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchFamilys = async () => {
    try {
      const response = await GetAllFamily();
      const familyData = response.map(
        (family: { id: UUID; ds_Family: string }) => ({
          id: family.id,
          family: family.ds_Family,
        })
      );
      setFamilys(familyData);
    } catch (error) {
      console.log(error, "Falha ao buscar familias");
    }
  };

  useEffect(() => {
    fetchFamilys();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await GetByFamilyId(formData.family);
      setResources(response);
    } catch (error) {
      console.log(error, "Falha ao buscar recurso");
    }
  };

  useEffect(() => {
    if (formData.family) {
      fetchResources();
    }
  }, [formData.family]);

  const fetchCalendarAndAvailables = async () => {
    try {
      const response = await GetDataFromId(formData.resource);

      setFormData({
        ...formData,
        calendar: response.cd_Calendar,
        vlTime: response.resourcesAvailable[0].vlTime,
        startDate: new Date(response.resourcesAvailable[0].startDate),
        endDate: new Date(response.resourcesAvailable[0].endDate),
      });

      console.log(formData);
    } catch (error) {
      console.log(error, "Erro ao buscar");
    }
  };

  useEffect(() => {
    if (formData.resource) {
      fetchCalendarAndAvailables();
    }
  }, [formData.resource]);

  const fetchCalendarDays = async () => {
    const response = await GetDataDaysFromId(formData.calendar);
    const days = response.calendarDays.map(
      (day: { dt_Ocurrence: string }) => new Date(day.dt_Ocurrence)
    );

    setCalendarDays(days);
  };

  useEffect(() => {
    if (formData.calendar) {
      fetchCalendarDays();
    }
  }, [formData.calendar]);

  const dateInArray = () => {
  // Verifica o intervalo de datas entre startDate e endDate no array de datas
  const dateRange = checkDatesRange(
    formatDate(formData.startDate),
    formatDate(formData.endDate),
    dates
  );

  const { startIndex, endIndex } = dateRange;

  if (startIndex !== null && endIndex !== null) {
    const initialVlTime = createVlTimeArray(
      dates,
      formData.vlTime,
      startIndex,
      endIndex
    );

    const workDaysStatus = isWorkDay(dates);

    const updatedVlTime = initialVlTime.map((time, index) => {
      const dayStatus = workDaysStatus[index];

      if (dayStatus.isWeekend) {
        return 0;
      }
      return time;
    });

    setTime(updatedVlTime);
  } else {
    setTime(new Array(dates.length).fill(null));
  }
};

  useEffect(() => {
    if (formData.startDate) {
      dateInArray();
    }
  }, [formData.startDate]);

  return (
    <Row>
      <Col span={24}>
        <Card
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTop: "none",
          }}
          bodyStyle={{ padding: 15 }}
        >
          <Form layout="vertical">
            <div style={{ display: "flex" }}>
              <Form.Item
                label={t("labels.period")}
                style={formStyle("calc(50% - 8px)", "8px")}
              >
                <RangePicker
                  format={"DD/MM/YYYY"}
                  onChange={handleChangeDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label={t("labels.family")}
                style={formStyle("calc(50% - 8px)", "8px")}
              >
                <Select onSelect={(e) => handleInputChange("family", e)}>
                  {familys.map((family) => (
                    <Option key={family.id} value={family.id}>
                      {family.family}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Radio.Group
                style={{ width: "100%" }}
                onChange={handleRadioChange}
                value={selectedRadio}
              >
                <Form.Item
                  label={
                    <>
                      <Radio disabled value={2} />
                      <span>{t("labels.process")}</span>
                    </>
                  }
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select disabled />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      <Radio value={1} />
                      <span>{t("labels.resource")}</span>
                    </>
                  }
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select onChange={(e) => handleInputChange("resource", e)}>
                    {resources.map((resources) => (
                      <Option value={resources.id} key={resources.id}>
                        {resources.ds_Resource}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Radio.Group>
            </div>

            <Button
              style={{
                width: "10%",
                position: "relative",
                float: "right",
              }}
              onClick={showModal}
              type="primary"
              icon={<FileExcelOutlined />}
            >
              {t("generalButtons.generateButton")}
            </Button>
          </Form>
        </Card>
      </Col>

      <div style={{ width: "100%" }}>
        <Col span={24} style={{ marginTop: 150 }}>
          <MixedGraph labels={dates} time={time} />
        </Col>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Gerar"
      >
        <Form layout="vertical">
          <Form.Item label={t("labels.nameArchive")}>
            <Input value={inputValue} />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default Reports;
