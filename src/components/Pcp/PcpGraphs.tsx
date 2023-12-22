import { AgChartsReact } from "ag-charts-react";
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgLineSeriesOptions,
  AgNumberAxisOptions,
} from "ag-charts-community";
import { getData } from "./data";

import { useState } from "react";

export const BarGraph: React.FC = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    data: [
      { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
      { month: "Feb", avgTemp: 16.2, iceCreamSales: 800000 },
      { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
      { month: "Apr", avgTemp: 22.8, iceCreamSales: 654000 },
      { month: "May", avgTemp: 14.5, iceCreamSales: 950000 },
      { month: "Jun", avgTemp: 8.9, iceCreamSales: 700200 },
      { month: "Jul", avgTemp: 8.9, iceCreamSales: 400000 },
      { month: "Aug", avgTemp: 8.9, iceCreamSales: 157892 },
      { month: "Set", avgTemp: 8.9, iceCreamSales: 300200 },
      { month: "Out", avgTemp: 8.9, iceCreamSales: 100000 },
      { month: "Nov", avgTemp: 8.9, iceCreamSales: 204000 },
      { month: "Dez", avgTemp: 8.9, iceCreamSales: 500000 },
    ],
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
      } as AgBarSeriesOptions,
      { type: "line", xKey: "month", yKey: "avgTemp" } as AgLineSeriesOptions,
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      } as AgCategoryAxisOptions,
      {
        type: "number",
        position: "left",
        keys: ["iceCreamSales"],
      } as AgNumberAxisOptions,
      {
        type: "number",
        position: "right",
        keys: ["avgTemp"],
      } as AgNumberAxisOptions,
    ],
    legend: {
      enabled: false
    },
  });
  return <AgChartsReact options={options} />;
};

export const PieGraph: React.FC = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    data: getData(),
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
