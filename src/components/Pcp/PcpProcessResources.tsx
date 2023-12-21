import { AgChartsReact } from "ag-charts-react";
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgCharts,
  AgLineSeriesOptions,
  AgNumberAxisOptions,
} from "ag-charts-community";
import React, { useState } from "react";
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
import { DataFetcherUniversity } from "components/DataFetcherJson";
import { DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib";

const { RangePicker } = DatePicker;

import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "next-i18next";
const weekFormat = "DD/MM/YYYY";

const { TextArea } = Input;

const PcpProcessResources: React.FC = () => {
  const { t } = useTranslation("layout");

  const [options, setOptions] = useState<AgChartOptions>({
    data: [
      { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
      { month: "Feb", avgTemp: 16.2, iceCreamSales: 800000 },
      { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
      { month: "Apr", avgTemp: 22.8, iceCreamSales: 654000 },
      { month: "May", avgTemp: 14.5, iceCreamSales: 950000 },
      { month: "Jun", avgTemp: 8.9, iceCreamSales: 700200 },
      { month: "Jul", avgTemp: 8.9, iceCreamSales: 400000 },
      { month: "Aug", avgTemp: 8.9, iceCreamSales: 157892 },
      { month: "Set", avgTemp: 8.9, iceCreamSales: 300200 },
      { month: "Out", avgTemp: 8.9, iceCreamSales: 100000 },
      { month: "Nov", avgTemp: 8.9, iceCreamSales: 204000 },
      { month: "Dez", avgTemp: 8.9, iceCreamSales: 500000 },
    ],

    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
      } as AgBarSeriesOptions,
      { type: "line", xKey: "month", yKey: "avgTemp" } as AgLineSeriesOptions,
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      } as AgCategoryAxisOptions,
      {
        type: "number",
        position: "left",
        keys: ["iceCreamSales"],
      } as AgNumberAxisOptions,
      {
        type: "number",
        position: "right",
        keys: ["avgTemp"],
      } as AgNumberAxisOptions,
    ],
    legend: {
      position: "bottom",
    },
  });

  const [selectedRadio, setSelectedRadio] = useState(1);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedRadio(e.target.value);
  };

  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleSelectChange = (value: React.SetStateAction<null>) => {
    setSelectedUniversity(value);
  };

  return (
    <Row gutter={15}>
      <Col span={12}>
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
                label={t('labels.type')}
                style={{
                  width: "calc(50% - 8px)",
                  display: "inline-block",
                  margin: "0px 16px 0 0px",
                }}
              >
                <Select
                  defaultValue={"Transformador de Distribuição"}
                  options={[
                    {
                      value: "Transformador de Distribuição",
                    },
                    {
                      value: "Transformador a Seco",
                    },
                    {
                      value: "Transformador de Meia Força",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={t('labels.selectDate')}
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
                  {t('labels.process')}
                </Radio>
                <Radio
                  value={2}
                  style={{ display: "inline-block", width: "calc(49% - 8px)" }}
                >
                  {t('labels.resource')}
                </Radio>
              </Radio.Group>

              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 16px 0 0",
                }}
              >
                <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=10">
                  {(universityData) => (
                    <Select
                      placeholder="Selecione o processo"
                      showSearch
                      onChange={(value) => handleSelectChange(value)}
                      disabled={selectedRadio === 2}
                    >
                      {universityData.map((item) => (
                        <Select.Option key={item.id} value={item.name}>
                          {`${item.name} (${item.alpha_two_code})`}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </DataFetcherUniversity>
              </Form.Item>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=30">
                  {(universityData) => (
                    <Select
                      placeholder="Selecione o recurso"
                      showSearch
                      onChange={(value) => handleSelectChange(value)}
                      disabled={selectedRadio === 1}
                    >
                      {universityData.map((item) => (
                        <Select.Option key={item.id} value={item.name}>
                          {`${item.name} (${item.alpha_two_code})`}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </DataFetcherUniversity>
              </Form.Item>
            </div>
            <div>
              <Form layout="vertical">
                <Form.Item
                  label={t('labels.quotation')}
                  style={{
                    margin: "0 16px 0 0",
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=30">
                    {(universityData) => (
                      <Select>
                        {universityData.map((item) => (
                          <Select.Option key={item.id} value={item.name}>
                            {`${item.name} (${item.alpha_two_code})`}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </DataFetcherUniversity>
                </Form.Item>
                <Form.Item
                  label={t('labels.client')}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('labels.quotation')}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 16px 0 0",
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('labels.salesOrder')}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item label={t('labels.processResource')}>
                  <Select
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  />
                  <Select
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 0px 0 16px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={t('labels.minutesConsum')}
                  style={{
                    width: "calc(50% - 8px)",
                    display: "inline-block",
                    margin: "0px 16px 0 0px",
                  }}
                >
                  <CustomInputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label={t('labels.selectDate')}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <DatePicker style={{ width: "100%" }} format={weekFormat} />
                </Form.Item>
                <Form.Item label={t('labels.notes')}>
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
                    width: "calc(33.33% - 8px)",
                  }}
                >
                  {t("generalButtons.newButton")}
                </Button>
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(33.33% - 8px)",
                  }}
                >
                  {t("generalButtons.editButton")}
                </Button>
                <Button
                  type="primary"
                  style={{
                    display: "inline-block",
                    width: "calc(33.33% - 8px)",
                  }}
                >
                  {t("generalButtons.deleteButton")}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={12} style={{ height: 245 }}>
        <AgChartsReact options={options} />

        <AgChartsReact options={options} />

        <AgChartsReact options={options} />
      </Col>
    </Row>
  );
};
export default PcpProcessResources;
