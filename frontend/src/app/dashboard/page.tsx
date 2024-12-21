import React from "react";
import MilestoneChart from "@/components/charts/MilestoneChart";
import ProgressChart from "@/components/charts/ProgressChart";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Your Child  Progress
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Milestone Overview
          </h2>
          <MilestoneChart />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Overall Progress
          </h2>
          <ProgressChart />
        </div>
      </div>
    </div>
  );
}