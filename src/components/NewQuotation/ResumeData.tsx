import { List, Typography } from "antd";
import { DataFetcher } from "components/DataFetcherJson";
import React from "react";

export const Cotacao: React.FC = () => {
  return (
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="cotacao">
      {(cotacaoData) => (
        <List
          style={{
            height: "100%",
            overflowY: "auto",
            maxHeight: "100%",
            width: "100%",
          }}
          size="small"
          dataSource={cotacaoData}
          renderItem={(item, index) => (
            <List.Item
              style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
            >
              <Typography.Text mark>[DIA]</Typography.Text>
              {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${
                item.processo
              } (${item.duracao || "Sem duração"})`}
            </List.Item>
          )}
        />
      )}
    </DataFetcher>
  );
};

export const Resumido: React.FC = () => {
  return (
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="resumido">
      {(resumidoData) => (
        <List
          style={{
            height: "100%",
            overflowY: "auto",
            maxHeight: "100%",
            width: "100%",
          }}
          size="small"
          dataSource={resumidoData}
          renderItem={(item, index) => (
            <List.Item
              style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
            >
              <Typography.Text mark>[DIA]</Typography.Text>
              {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${
                item.processo
              } (${item.duracao || "Sem duração"})`}
            </List.Item>
          )}
        />
      )}
    </DataFetcher>
  );
};

export const Detalhado: React.FC = () => {
  return (
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="detalhado">
      {(detalhadoData) => (
        <List
          style={{
            height: "100%",
            overflowY: "auto",
            maxHeight: "100%",
            width: "100%",
          }}
          size="small"
          dataSource={detalhadoData}
          renderItem={(item, index) => (
            <List.Item
              style={{ background: index % 2 === 0 ? "white" : "#f0f0f0" }}
            >
              <Typography.Text mark>[DATA]</Typography.Text>
              {`${item.dia} [${item.data_inicial}] [${item.data_final}] ${
                item.processo
              } (${item.duracao || "Sem duração"})`}
            </List.Item>
          )}
        />
      )}
    </DataFetcher>
  );
};
