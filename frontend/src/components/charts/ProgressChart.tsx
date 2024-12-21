import React from "react";
import { Pie, ChartOptions } from "react-chartjs-2";
import useMilestoneStore from "../../stores/milestoneStore";
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);


interface TooltipItem {
  label: string;
  formattedValue: string;
}


interface ProgressChartProps {
    completedColor?: string;
    pendingColor?: string;
    className?: string;
    options?: ChartOptions<'pie'>
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  completedColor = "#4caf50",
  pendingColor = "#ff9800",
  className,
    options
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
          hoverBackgroundColor: [completedColor.replace(
              completedColor.substring(completedColor.length-3),
              String(Number(completedColor.substring(completedColor.length-3)) + 30)
          ),
            pendingColor.replace(
                pendingColor.substring(pendingColor.length-3),
                String(Number(pendingColor.substring(pendingColor.length-3)) + 30)
            )
          ]
      },
    ],
  };

    const defaultChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
         plugins: {
           legend: {
                 position: 'bottom' as const,
                 labels:{
                     usePointStyle: true
                 }
             },
             title: {
                 display: false,
             },
              tooltip: {
                  enabled: true,
                  callbacks: {
                        label: (tooltipItem: TooltipItem) => {
                            return `${tooltipItem.label}: ${tooltipItem.formattedValue}`
                        },
                      },
              },
         }
    }

    const chartOptions = options ? {...defaultChartOptions, ...options} : defaultChartOptions

  if (!milestones.length) {
      return (
        <div className="p-4 border border-gray-300 rounded-md text-center">
          <p className="text-gray-600">No milestones to display</p>
        </div>
    );
  }
  return <div className={`${className ? className : ""}`}><Pie data={chartData} options={chartOptions} aria-label="Milestone Progress Chart" /></div>;
};

export default ProgressChart;