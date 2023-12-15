import { AgChartsReact } from "ag-charts-react";
import {
  AgChartOptions,
  AgBarSeriesOptions,
  AgLineSeriesOptions,
} from "ag-charts-community";
import React, { useRef, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Form,
  List,
  Radio,
  Row,
  Select,
  theme,
} from "antd";
import { DataFetcherUniversity } from "components/DataFetcherJson";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

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

  const handleItemClick = () => {
    console.log("Item clicado:");
  };

  return (
    <Row gutter={15}>
      <Col span={14}>
        <Card bodyStyle={{ padding: "5px 0 5px 0" }} style={{ height: "100%" }}>
          <Divider orientation="left">Grupos</Divider>

          <Row gutter={15} style={{ margin: 5 }}>
            <Col span={12}>
              <Radio>Processo</Radio>
              <Card
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  maxHeight: 300,
                  maxWidth: "100%",
                }}
                bodyStyle={{ padding: 0 }}
              >
                <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=10">
                  {(universityData) => (
                    <List
                      dataSource={universityData}
                      renderItem={(item, index) => (
                        <List.Item
                          style={{
                            background: index % 2 === 0 ? "white" : "#f0f0f0",
                          }}
                        >
                          {`${item.name} (${item.alpha_two_code})`}
                        </List.Item>
                      )}
                    />
                  )}
                </DataFetcherUniversity>
              </Card>
            </Col>
            <Col span={12}>
              <Radio>Recurso</Radio>
              <Card
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  maxHeight: 300,
                  maxWidth: "100%",
                }}
                bodyStyle={{ padding: 0 }}
              >
                <DataFetcherUniversity apiUrl="http://universities.hipolabs.com/search?country=United+States&limit=30">
                  {(universityData) => (
                    <List
                      dataSource={universityData}
                      renderItem={(item, index) => (
                        <List.Item
                          onClick={handleItemClick}
                          style={{
                            background: index % 2 === 0 ? "white" : "#f0f0f0",
                          }}
                        >
                          {`${item.name} (${item.alpha_two_code})`}
                        </List.Item>
                      )}
                    />
                  )}
                </DataFetcherUniversity>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={10} style={{ height: "100%", minHeight: "100%" }}>
        <div style={{ padding: "0px 15px 0px 15px" }}>
          <Form layout="vertical">
            <Form.Item
              label="Tipo"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
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
              colon={false}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <RangePicker />
            </Form.Item>
          </Form>
        </div>
        <AgChartsReact options={options} />
      </Col>
    </Row>
  );
};
export default PcpProcessResources;
