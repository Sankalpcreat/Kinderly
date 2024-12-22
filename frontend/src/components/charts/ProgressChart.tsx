import React from "react";
import { Pie, ChartOptions } from "react-chartjs-2";
import useMilestoneStore from "../../stores/milestoneStore";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface ProgressChartProps {
  completedColor?: string;
  pendingColor?: string;
  className?: string;
  options?: ChartOptions<"pie">;
  legendPosition?: "top" | "bottom" | "left" | "right";
}

const lightenColor = (color: string, amount: number): string => {
  const num = parseInt(color.slice(1), 16),
    r = (num >> 16) + amount,
    b = ((num >> 8) & 0x00ff) + amount,
    g = (num & 0x0000ff) + amount;
  return `#${(0x1000000 + (r < 255 ? r < 1 ? 0 : r : 255) * 0x10000 + (b < 255 ? b < 1 ? 0 : b : 255) * 0x100 + (g < 255 ? g < 1 ? 0 : g : 255)).toString(16).slice(1)}`;
};

const ProgressChart: React.FC<ProgressChartProps> = ({
  completedColor = "#4caf50",
  pendingColor = "#ff9800",
  className,
  options,
  legendPosition = "bottom",
}) => {
  const milestones = useMilestoneStore((state) => state.milestones);

  const completed = milestones.filter((m) => m.date <= new Date().toISOString())
    .length;
  const total = milestones.length;

  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: [completedColor, pendingColor],
        hoverBackgroundColor: [
          lightenColor(completedColor, 30),
          lightenColor(pendingColor, 30),
        ],
        borderWidth: 1,
      },
    ],
  };

  const defaultChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const currentIndex = tooltipItem.dataIndex;
            const label = chartData.labels[currentIndex];
            const value = dataset.data[currentIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const chartOptions = options
    ? { ...defaultChartOptions, ...options }
    : defaultChartOptions;

  if (!milestones || milestones.length === 0) {
    return (
      <div className="p-4 border border-gray-300 rounded-md text-center">
        <p className="text-gray-600">No milestones to display</p>
      </div>
    );
  }

  return (
    <div className={`${className ? className : ""}`}>
      <Pie data={chartData} options={chartOptions} aria-label="Milestone Progress Chart" />
    </div>
  );
};

export default ProgressChart;