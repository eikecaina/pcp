import { List, Typography } from "antd";
import { DataFetcher } from "components/DataFetcherJson";
import React from "react";

export const Cotacao: React.FC = () => {
  return (
    <List
      style={{
        height: "100%",
        overflowY: "auto",
        maxHeight: "100%",
        width: "100%",
      }}
      size="small"
      renderItem={(item, index) => (
        <List.Item
          style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
        >
          <Typography.Text mark>[DIA]</Typography.Text>
        </List.Item>
      )}
    />
  );
};

export const Resumido: React.FC = () => {
  return (
    <List
      style={{
        height: "100%",
        overflowY: "auto",
        maxHeight: "100%",
        width: "100%",
      }}
      size="small"
      renderItem={(item, index) => (
        <List.Item
          style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
        >
          <Typography.Text mark>[DIA]</Typography.Text>
        </List.Item>
      )}
    />
  );
};

export const Detalhado: React.FC = () => {
  return (
    <List
      style={{
        height: "100%",
        overflowY: "auto",
        maxHeight: "100%",
        width: "100%",
      }}
      size="small"
      renderItem={(item, index) => (
        <List.Item
          style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
        >
          <Typography.Text mark>[DATA]</Typography.Text>
        </List.Item>
      )}
    />
  );
};
