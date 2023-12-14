import { List, Typography } from "antd";
import React from "react";
import { useEffect, useState } from "react";

const axios = require("axios");

interface Props {
  apiUrl: string;
  tipo: string;
  children: (data: any[]) => React.ReactNode;
}

export const DataFetcher: React.FC<Props> = ({ apiUrl, tipo, children }) => {
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    try {
      const response = await axios.get(apiUrl);

      const dataResponse =
        response.data.jsonData.registros.find((item) => item.tipo === tipo)
          ?.dados || [];

      setData(dataResponse);
    } catch (error) {
      console.error("Erro ao acessar a API:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiUrl, tipo]);

  return <>{children(data)}</>;
};

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
