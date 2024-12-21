import React from "react";
import MilestoneForm from "@/components/forms/MilestoneForm";
import MilestoneChart from "@/components/charts/MilestoneChart";

export default function MilestonesPage() {
  return (
    <div className="milestones-page">
      <h1 className="text-2xl font-bold mb-6">Milestones</h1>
      <MilestoneForm />
      <MilestoneChart />
    </div>
  );
}