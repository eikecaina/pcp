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
import {
  GetByFamilyId,
  GetConsumByResourceId,
} from "@/app/api/services/Resource/data";
import { GetDataFromId } from "@/app/api/services/Resource/data";
import { GetDataDaysFromId } from "@/app/api/services/Calendar/data";
import {
  checkDatesRange,
  createVlTimeArray,
  findMatchingDates,
  formatDateEn,
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
  const [formData, setFormData] = useState<any>({
    vl_consumption: [],
  });
  const [selectedRadio, setSelectedRadio] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [familys, setFamilys] = useState<Family[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [time, setTime] = useState<any[]>([]);
  const [consum, setConsum] = useState<number[]>([]);
  const [indexDate, setIndexDate] = useState<number[]>([]);
  const [consumIndexArray, setConsumIndexArray] = useState<number[]>([]);

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
 
  /*Transforma as duas datas de inicio e fim do rangepicker em um array*/
  const getDatesInRange = (start: Date, end: Date): string[] => {
    const datesArray: string[] = [];
    let currentDate = new Date(start);
    end = new Date(end);

    while (currentDate <= end) {
      datesArray.push(formatDateEn(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  };

  /*Pegar datas do rangepicker*/
  const handleChangeDate = (selectedDays: any[]) => {
    if (selectedDays && selectedDays[0] && selectedDays[1]) {
      const [startDate, endDate] = selectedDays;
      const allDates: any = getDatesInRange(
        startDate.toDate(),
        endDate.toDate()
      );
      console.log("Datas do Input:", allDates);

      setDates(allDates);
    } else {
      setDates([]);
    }
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

  /*Requisição de recusrsos para pegar o consumo e a data*/
  const fetchConsumption = async () => {
    try {
      const response = await GetConsumByResourceId(formData.resource);

      const consumptionData = response.map(
        (item: { consumption_date: string }) => ({
          consumption_date: formatDateEn(item.consumption_date),
        })
      );

      const vlConsumption = response.map(
        (item: { vl_consumption: number }) => item.vl_consumption
      );

      setFormData((prevData: any) => ({
        ...prevData,
        consumption_date: consumptionData.map(
          (data: { consumption_date: any }) => data.consumption_date
        ),
        vl_consumption: vlConsumption,
      }));
    } catch (error) {
      console.log(error, "Erro ao buscar consumo");
    }
  };

  useEffect(() => {
    if (formData.resource) {
      console.log("Datas: ", formData.consumption_date);
      console.log("Consumo: ", formData.vl_consumption);
    }
  }, [formData.resource]);

  const fetchCalendarAndAvailables = async () => {
    try {
      const response = await GetDataFromId(formData.resource);

      setFormData((prevData: any) => ({
        ...prevData,
        calendar: response.cd_Calendar,
        vlTime: response.resourcesAvailable[0].vlTime,
        startDate: new Date(response.resourcesAvailable[0].startDate),
        endDate: new Date(response.resourcesAvailable[0].endDate),
      }));
    } catch (error) {
      console.log(error, "Erro ao buscar calendário e disponibilidade");
    }
  };

  const fetchAllData = async () => {
    try {
      await Promise.all([fetchCalendarAndAvailables(), fetchConsumption()]);
    } catch (error) {
      console.log(error, "Erro ao buscar os dados");
    }
  };

  useEffect(() => {
    if (formData.resource) {
      fetchAllData();
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

  /* Comparativo de index */
  const dateInArray = () => {
    const dateIndex = findMatchingDates(formData.consumption_date, dates);
    const consumIndex = findMatchingDates(dates, formData.consumption_date);

    if (dateIndex.length > 0) {
      setIndexDate(dateIndex);
      setConsumIndexArray(consumIndex);
    } else {
      console.log("Nenhum índice encontrado.");
    }
  };

  useEffect(() => {
    if (formData.startDate) {
      dateInArray();
    }
  }, [formData.startDate]);

  useEffect(() => {
    console.log("Índice encontrado:", indexDate);
    console.log("Índice encontrado consum:", consumIndexArray);
  }, [formData.startDate]);

  const updateConsum = (
    arrayDateIndices: number[],
    consumIndices: number[]
  ) => {
    if (formData.vl_consumption) {
      setConsum((prevConsum) => {
        const newConsum = [...prevConsum];

        arrayDateIndices.forEach((arrayDateIndex, i) => {
          const consumIndex = consumIndices[i];
          if (arrayDateIndex >= 0 && consumIndex >= 0) {
            newConsum[arrayDateIndex] = formData.vl_consumption[consumIndex];
          }
        });

        return newConsum;
      });
    } else {
      console.log("vl_consumption não definido.");
    }
  };

  useEffect(() => {
    if (formData.startDate) {
      updateConsum(indexDate, consumIndexArray);
      console.log(consum);      
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
                <Select
                  showSearch
                  onSelect={(e) => handleInputChange("family", e)}
                >
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
              disabled
              style={{
                width: "10%",
                position: "relative",
                float: "right",
              }}
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
          <MixedGraph labels={dates} time={time} consum={consum} />
        </Col>
      </div>
      {/*
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
      */}
    </Row>
  );
};

export default Reports;
