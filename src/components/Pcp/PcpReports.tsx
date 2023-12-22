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

import { useState } from "react";
import { FileExcelOutlined } from "@ant-design/icons";
import { BarGraph, PieGraph } from "./PcpGraphs";

const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
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
              <RangePicker  style={{ width: '100%' }}/>
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
              Gerar XML
            </Button>
          </Form>
        </Card>
      </Col>
      <Col span={13}>
        <div style={{ width: "100%", height: 334 }}>
          <PieGraph />
        </div>
      </Col>
      <div style={{ width: "100%" }}>
        <Col span={24} style={{ marginTop: 10, height: 396 }}>
          <BarGraph />
        </Col>
      </div>
    </Row>
  );
};

export default Reports;
