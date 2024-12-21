import React from "react";
import MilestoneForm from "@/components/forms/MilestoneForm";
import MilestoneChart from "@/components/charts/MilestoneChart";

export default function MilestonesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Track Your Child Milestones</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Log a New Milestone</h2>
          <MilestoneForm />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Milestone Progress</h2>
          <MilestoneChart />
        </div>
      </div>
    </div>
  );
}