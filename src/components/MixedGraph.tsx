import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MixedGraphProps {
  labels: Date[];
  time: number[];
}

export const MixedGraph: React.FC<MixedGraphProps> = ({ labels, time }) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data: ChartData<any> = {
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
     
    ],
  };

  return (
    <Chart
      type="bar"
      options={options}
      style={{ width: "100%" }}
      height={300}
      width={1500}
      data={data}
    />
  );
};
