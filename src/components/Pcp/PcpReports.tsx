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

import { ChangeEvent, useState } from "react";
import { FileExcelOutlined } from "@ant-design/icons";
import { BarGraph, PieGraph } from "./PcpGraphs";
import { exportToExcel } from "components/ExportExcel";

const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedSelect, setSelectedSelect] = useState(null);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedRadio(e.target.value);
  };

  const handleSelectChange = (value: React.SetStateAction<null>) => {
    setSelectedSelect(value);
  };

  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  
  const handleExport = () => {
    exportToExcel(inputValue);
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
              <RangePicker style={{ width: "100%" }} />
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
              onClick={showModal}
              type="primary"
              icon={<FileExcelOutlined />}
            >
              Gerar Excel
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

      <Modal
        title="Digite o nome do arquivo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Digite o nome">
            <Input value={inputValue} onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default Reports;