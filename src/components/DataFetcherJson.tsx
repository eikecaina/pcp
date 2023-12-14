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
        response.data.jsonData.registros.find((item: { tipo: string; }) => item.tipo === tipo)
          ?.dados || [];

      setData(dataResponse);
    } catch (error) {
      console.error("Erro ao acessar a API:");
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiUrl, tipo]);

  return <>{children(data)}</>;
};
