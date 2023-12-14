import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row } from "antd";

import { PcpDelivery, PcpDetails } from "./PcpDeliveryDetails";
import { PcpProcess } from "./PcpProcessTree";
import { PcpConsum, PcpPlanning } from "./PcpPlanningConsum";

interface DataNode {
  title: string;
  key: string;
  icon?: React.ReactNode;
  children?: DataNode[];
}

const PcpData: React.FC = () => {
  return (
    <Row gutter={6}>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            height: "100%",
            borderTop: "none",
            maxHeight: 714,
            padding: 0,
            width: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <PcpDelivery />
          <PcpDetails />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            borderTop: "none",
            padding: 0,
            width: "100%",
            height: "100%",
            maxHeight: 714,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <PcpProcess />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            width: "100%",
            borderTop: "none",
            height: "100%",
            maxHeight: 714,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <PcpPlanning />
          <PcpConsum />
        </Card>
      </Col>
    </Row>
  );
};

export default PcpData;
