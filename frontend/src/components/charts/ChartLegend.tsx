import React from "react";

const ChartLegend = () => (
  <div className="flex justify-center space-x-4 mt-4">
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-green-500"></div>
      <span>Completed</span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-orange-500"></div>
      <span>Pending</span>
    </div>
  </div>
);

export default ChartLegend;
