import { AgChartsReact } from "ag-charts-react";
import {
  AgChartOptions,
  AgBarSeriesOptions,
  AgLineSeriesOptions,
} from "ag-charts-community";
import React, { useRef, useState } from "react";
import { Card, Col, Divider, Form, Radio, Row, Select, theme } from "antd";
import { DataFetcherUniversity } from "components/DataFetcherJson";
import { DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib";
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
const weekFormat = "DD/MM/YYYY";

const PcpProcessResources: React.FC = () => {
  const chartRef = useRef<AgChartsReact>(null);
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
  });

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 270,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

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
      <Col span={14}>
        <Card bodyStyle={{ padding: "5px 0 5px 0" }} style={{ height: 714 }}>
          <Divider orientation="left">Grupos</Divider>
          <Form layout="vertical" style={{ margin: 15 }}>
            <Form.Item
              label="Tipo"
              style={{
                width: "calc(50% - 8px)",
                padding: "0 0px",
                display: "inline-block",
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
              label="Selecione a data"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0px 8px",
              }}
            >
              <RangePicker
              style={{ width: '100%' }}
                defaultValue={[
                  dayjs("2015/01/01", weekFormat),
                  dayjs("2015/01/01", weekFormat),
                ]}
                format={weekFormat}
              />
            </Form.Item>
          </Form>
          <Card style={{ margin: 15 }} bodyStyle={{ padding: 5 }}>
            <Radio.Group
              style={{ width: "100%", margin: "0 10px" }}
              onChange={handleRadioChange}
              value={selectedRadio}
            >
              <Radio
                value={1}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                Processo
              </Radio>
              <Radio
                value={2}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                Recurso
              </Radio>
            </Radio.Group>
            <Row gutter={15} style={{ margin: 5 }}>
              <Col span={12}>
                <div
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: 300,
                    maxWidth: "100%",
                  }}
                >
                  <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=10">
                    {(universityData) => (
                      <Select
                        placeholder="Selecione o processo"
                        showSearch
                        style={{
                          height: "100%",
                          overflowY: "auto",
                          maxHeight: "100%",
                          width: "100%",
                        }}
                        size="small"
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
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: 300,
                    maxWidth: "100%",
                  }}
                >
                  <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=30">
                    {(universityData) => (
                      <Select
                        placeholder="Selecione o recurso"
                        showSearch
                        style={{
                          height: "100%",
                          overflowY: "auto",
                          maxHeight: "100%",
                          width: "100%",
                        }}
                        size="small"
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
                </div>
              </Col>
            </Row>
          </Card>
        </Card>
      </Col>
      <Col span={10} style={{ height: "100%", minHeight: "100%" }}>
        <AgChartsReact options={options} />
      </Col>
    </Row>
  );
};
export default PcpProcessResources;
