interface ChartData {
    label: string;
    value: number;
  }
  
  export const prepareChartData = (data: Record<string, number>): ChartData[] => {
    return Object.entries(data).map(([label, value]) => ({
      label,
      value,
    }));
  };
  