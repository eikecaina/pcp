import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MixedGraphProps {
  labels: Date[];
  time: number[];
  consum: number[];
}

export const MixedGraph: React.FC<MixedGraphProps> = ({
  labels,
  time,
  consum,
}) => {
  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data: ChartData<"bar" | "line"> = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Capacidade",
        data: time,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
      {
        type: "bar",
        label: "Consumo",
        data: consum,
        backgroundColor: "rgba(0, 0, 255, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <Chart
      type="bar" // Define o tipo padrão aqui, pode ser "bar" ou "line"
      options={options}
      style={{ width: "100%" }}
      height={300}
      width={1500}
      data={data}
    />
  );
};
