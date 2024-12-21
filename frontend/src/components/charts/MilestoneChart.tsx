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
} from 'chart.js';

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


interface TooltipItem {
    label: string;
    formattedValue: string
}

interface TooltipModel {
    tooltipItems: TooltipItem[]
}

interface MilestoneChartProps {
    chartType?: "bar" | "line";
    chartColor?: string;
    className?: string;
    options?: ChartOptions<'bar' | 'line'>;
}

const MilestoneChart: React.FC<MilestoneChartProps> = ({
  chartType = "bar",
  chartColor = "rgba(75, 192, 192, 0.6)",
    className,
    options
}) => {
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
        backgroundColor: chartColor,
        hoverBackgroundColor: chartColor.replace("0.6", "0.8"),
        borderColor: chartColor.replace("0.6", "1"),
        borderWidth: 1
      },
    ],
  };

    const defaultChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: (tooltipItems: TooltipModel) => {
                         if (tooltipItems && tooltipItems.tooltipItems.length > 0) {
                            const firstTooltipItem = tooltipItems.tooltipItems[0];
                            return `Date: ${firstTooltipItem.label}`;
                         }
                       return "";
                     },
                     label: (tooltipItem: TooltipItem) => {
                         return `Milestones: ${tooltipItem.formattedValue}`;
                       }
                    },
                },
            },
        scales: {
                x: {
                   title: {
                        display: true,
                        text: 'Date',
                        },
                    },
                y: {
                        title: {
                            display: true,
                            text: 'Number of Milestones',
                        },
                    },
            },
        };

    const chartOptions = options ? {...defaultChartOptions, ...options} : defaultChartOptions

    if(!milestones.length) {
        return (
            <div className="p-4 border border-gray-300 rounded-md text-center">
                 <p className="text-gray-600">No milestones to display</p>
            </div>
        );
    }

    if (chartType === "bar") {
        return (
          <div className={`${className ? className : ""}`}>
              <Bar data={chartData} options={chartOptions} aria-label="Milestone Bar Chart"/>
          </div>
          );
      }

    return (
          <div className={`${className ? className : ""}`}>
              <Line data={chartData} options={chartOptions}  aria-label="Milestone Line Chart"/>
          </div>
      );
};

export default MilestoneChart;