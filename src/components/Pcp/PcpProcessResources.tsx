import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import React, { useState } from "react";
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  List,
  Radio,
  Row,
  Select,
  Space,
  theme,
} from "antd";
import { DataFetcherUniversity } from "components/DataFetcherJson";
import { DatePicker } from "antd";
import { RadioChangeEvent } from "antd/lib";

const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import CustomInputNumber from "components/CustomInputNumber";
const weekFormat = "DD/MM/YYYY";

const { TextArea } = Input;

const PcpProcessResources: React.FC = () => {
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
      },
    ],
  });

  const { token } = theme.useToken();

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
        <Card bodyStyle={{ padding: 0 }}>
          <Divider orientation="left">Grupos</Divider>
          <div style={{ padding: "5px 10px 5px 10px" }}>
            <Form layout="vertical">
              <Form.Item
                label="Tipo"
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
                label="Selecione a data"
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
                style={{ width: "100%", margin: "0 5px" }}
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
              <Row gutter={15}>
                <Col span={12}>
                    <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=10">
                      {(universityData) => (
                        <Select
                          placeholder="Selecione o processo"
                          showSearch
                          style={{
                            width: "100%",
                          }}
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
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=30">
                      {(universityData) => (
                        <Select
                          placeholder="Selecione o recurso"
                          showSearch
                          style={{
                            width: "100%",
                          }}
                          
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
            </div>
            <div style={{ padding: "10px 0" }}>
              <Row gutter={15}>
                <Col span={12}>
                  <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=30">
                    {(universityData) => (
                      <Form layout="vertical">
                        <Form.Item label="Controle">
                          <Select
                            placeholder="Selecione o recurso"
                            style={{
                              width: "100%",
                            }}                          
                          >
                            {universityData.map((item) => (
                              <Select.Option key={item.id} value={item.name}>
                                {`${item.name} (${item.alpha_two_code})`}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Form>
                    )}
                  </DataFetcherUniversity>
                  <div></div>
                </Col>
                <Col span={12}>
                  <Form layout="vertical">
                    <Form.Item
                      label="Cliente"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Cotação"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 16px 0 0",
                      }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="OV"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                      }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Processos e Recursos Consumidos">
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
                      label="Consumo em Segundos"
                      style={{
                        width: "calc(50% - 8px)",
                        display: "inline-block",
                        margin: "0px 16px 0 0px",
                      }}
                    >
                      <CustomInputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label="Selecione a data"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                      }}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        format={weekFormat}
                      />
                    </Form.Item>
                    <Form.Item label="Notas">
                      <TextArea
                        value={"Abatimento com cálculo automático por Vendas."}
                        disabled
                        style={{ height: 50, resize: "none" }}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={10} style={{ height: 230 }}>
        <AgChartsReact options={options} />

        <AgChartsReact options={options} />

        <AgChartsReact options={options} />
      </Col>
    </Row>
  );
};
export default PcpProcessResources;
