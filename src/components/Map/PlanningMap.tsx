import { CloseOutlined, EditOutlined, FileExcelOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";

const { RangePicker } = DatePicker;

const PlanningMap: React.FC = () => {
  return (
    <Row gutter={5}>
      <Col span={12}>
        <Card bodyStyle={{ padding: 10 }}>
          <Form layout="vertical" style={{ marginTop: 8 }}>
            <Form.Item
              label="Modelo"
              style={{
                display: "inline-block",
                width: "calc(50%)",
                marginRight: 8,
              }}
            >
              <Select />
            </Form.Item>
            <Form.Item
              label="Data"
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
          <Button
            style={{
              display: "inline-block",
              width: "calc(25% - 8px)",
              marginRight: 8,
            }}
            type="primary"
            icon={<PlusOutlined />}
          >
            Novo
          </Button>
          <Button
            style={{
              display: "inline-block",
              width: "calc(25% - 8px)",
              marginRight: 8,
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            Editar
          </Button>
          <Button
            style={{
              display: "inline-block",
              width: "calc(25% - 8px)",
              marginRight: 8,
            }}
            type="primary"
            icon={<SaveOutlined />}
          >
            Salvar
          </Button>
          <Button
            style={{
              display: "inline-block",
              width: "25%",
            }}
            type="primary"
            icon={<CloseOutlined />}
          >
            Excluir
          </Button>
        </Card>
      </Col>
      <Col span={12}>
        <Card></Card>
      </Col>
    </Row>
  );
};

export default PlanningMap;
