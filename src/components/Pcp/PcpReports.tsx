import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from "antd";
import { AgChartsReact } from "ag-charts-react";
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgLineSeriesOptions,
  AgNumberAxisOptions,
} from "ag-charts-community";
import { useState } from "react";
import { FileExcelOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
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

  const [selectedSelect, setSelectedSelect] = useState(null);

  const handleSelectChange = (value: React.SetStateAction<null>) => {
    setSelectedSelect(value);
  };

  return (
    <Row gutter={10}>
      <Col span={11}>
        <Card
          style={{
            height: 334,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTop: "none",
          }}
          bodyStyle={{ padding: 15 }}
        >
          <Form layout="vertical">
            <Form.Item
              label="Período"
              style={{
                width: "calc(50% - 8px)",
                display: "inline-block",
                margin: "0 8px",
              }}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              label="Grupo"
              style={{ width: "calc(50% - 8px)", display: "inline-block" }}
            >
              <Select
                defaultValue={"Transformador de Distribuição"}
                options={[
                  { value: "Transformador de Distribuição" },
                  { value: "Transformador Seco" },
                  { value: "Transformador Meia Força" },
                ]}
              />
            </Form.Item>
            <Radio.Group
              style={{ width: "100%" }}
              onChange={handleRadioChange}
              value={selectedRadio}
            >
              <Form.Item
                label={
                  <>
                    <Radio value={1} />
                    <span>Processo</span>
                  </>
                }
                style={{
                  width: "calc(50% - 8px)",
                  display: "inline-block",
                  margin: "0 8px",
                }}
              >
                <Select
                  onChange={(value) => handleSelectChange(value)}
                  disabled={selectedRadio === 2}
                />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <Radio value={2} />
                    <span>Recurso</span>
                  </>
                }
                style={{ width: "calc(50% - 8px)", display: "inline-block" }}
              >
                <Select
                  onChange={(value) => handleSelectChange(value)}
                  disabled={selectedRadio === 1}
                />
              </Form.Item>
            </Radio.Group>

            <Button
              style={{
                width: "35%",
                position: "relative",
                top: 80,
                float: "right",
              }}
              type="primary"
              icon={<FileExcelOutlined />}
            >
              Gerar Arquivo
            </Button>
          </Form>
        </Card>
      </Col>
      <Col span={13}>
        <div style={{ width: "100%", height: 334 }}>
          <AgChartsReact options={options} />
        </div>
      </Col>
      <div style={{ width: "100%" }}>
        <Col span={24} style={{ marginTop: 10, height: 396 }}>
          <AgChartsReact options={options} />
        </Col>
      </div>
    </Row>
  );
};

export default Reports;
