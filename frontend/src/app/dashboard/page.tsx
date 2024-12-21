import React from "react";
import MilestoneChart from "@/components/charts/MilestoneChart";
import ProgressChart from "@/components/charts/ProgressChart";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MilestoneChart />
        <ProgressChart />
      </div>
    </div>
  );
}