import React from "react";
import { Bar } from "react-chartjs-2";
import useMilestoneStore from "../../stores/milestoneStore";
import { prepareChartData } from "../../utils/chartUtils";

const MilestoneChart = () => {
  const milestones = useMilestoneStore((state) => state.milestones);

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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default MilestoneChart;
