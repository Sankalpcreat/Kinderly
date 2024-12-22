import React from "react";
import { Bar, Line, ChartOptions } from "react-chartjs-2";
import useMilestoneStore from "../../stores/milestoneStore";
import { prepareChartData } from "../../utils/chartUtils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

interface MilestoneChartProps {
  chartType?: "bar" | "line";
  chartColor?: string;
  className?: string;
  options?: ChartOptions<"bar" | "line">;
  displayLegend?: boolean;
  displayTitle?: boolean;
}

const MilestoneChart: React.FC<MilestoneChartProps> = ({
  chartType = "bar",
  chartColor = "rgba(75, 192, 192, 0.6)",
  className,
  options,
  displayLegend = false,
  displayTitle = false,
}) => {
  const milestones = useMilestoneStore((state) => state.milestones);

  if (!milestones || milestones.length === 0) {
    return (
      <div className="p-4 border border-gray-300 rounded-md text-center">
        <p className="text-gray-600">No milestones to display</p>
      </div>
    );
  }

  const data = prepareChartData(
    milestones.reduce((acc, milestone) => {
      acc[milestone.date] = (acc[milestone.date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Milestones",
        data: data.map((d) => d.value),
        backgroundColor: chartColor,
        hoverBackgroundColor: `${chartColor.replace(/[\d.]+(?=\))/, "0.8")}`,
        borderColor: `${chartColor.replace(/[\d.]+(?=\))/, "1")}`,
        borderWidth: 1,
      },
    ],
  };

  const defaultChartOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: displayLegend,
      },
      title: {
        display: displayTitle,
        text: "Milestones Chart",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) =>
            tooltipItems.length > 0
              ? `Date: ${tooltipItems[0].label}`
              : "",
          label: (tooltipItem: TooltipItem<"bar" | "line">) =>
            `Milestones: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Milestones",
        },
      },
    },
  };

  const chartOptions = options
    ? { ...defaultChartOptions, ...options }
    : defaultChartOptions;

  return (
    <div className={`${className ? className : ""}`}>
      {chartType === "bar" ? (
        <Bar data={chartData} options={chartOptions} aria-label="Milestone Bar Chart" />
      ) : (
        <Line data={chartData} options={chartOptions} aria-label="Milestone Line Chart" />
      )}
    </div>
  );
};

export default MilestoneChart;