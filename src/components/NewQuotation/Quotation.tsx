import { SettingOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import { FloatMenu, GeneralData, ProductConfig } from "./ItensConfig";
import Resume from "./Resume";
import ConfigModal from "./ConfigModal/ConfigModal";

const Quotation: React.FC = () => {
  return (
    <Row gutter={10} style={{ height: "100%" }}>
      <Col span={9}>
        <Card style={{ height: "100%" }} bodyStyle={{ padding: 0 }}>
          <Divider orientation="left">Configurações de itens</Divider>
          <GeneralData />
          <ProductConfig />
          <FloatMenu />
        </Card>
      </Col>
      <Col span={15}>
        <div style={{ overflowY: "auto", width: "100%", height: "100%" }}>
          <Resume />
        </div>
      </Col>
    </Row>
  );
};

export default Quotation;
