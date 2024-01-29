import { AgChartsReact } from "ag-charts-react";
import axios from 'axios';

import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgLineSeriesOptions,
  AgNumberAxisOptions,
} from "ag-charts-community";

import { useEffect, useState } from "react";
import { getDataPie } from "./data";

interface DataItem {
  month: string;
  iceCreamSales: number;
  avgTemp: number;
}

export const BarGraph: React.FC = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    data: [],
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
      },
      {
        type: "line",
        xKey: "month",
        yKey: "avgTemp",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        keys: ["iceCreamSales"],
      },
      {
        type: "number",
        position: "right",
        keys: ["avgTemp"],
      },
    ],
    legend: {
      enabled: false,
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getDataGraphs");
        const jsonData: DataItem[] = response.data.jsonData;
        setOptions((prevOptions) => ({
          ...prevOptions,
          data: jsonData,
        }));
      } catch (error) {
        console.error("Erro ao obter dados da API:", error);
      }
    };

    fetchData();
  }, []);

  return <AgChartsReact options={options} />;
};

export const PieGraph: React.FC = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    data: getDataPie(),
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  });
  return <AgChartsReact options={options} />;
};
