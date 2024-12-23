"use client"
import React from "react";
import MilestoneChart from "@/components/charts/MilestoneChart";
import ProgressChart from "@/components/charts/ProgressChart";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Welcome back, [Child Name]! {/* Replace with actual child's name */}
        </h1>
        <p className="text-gray-600">
          Here a look at your progress and milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Milestone Overview Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Key Milestones Achieved
          </h2>
          <MilestoneChart />
        </div>

        {/* Overall Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Progress Towards Goals
          </h2>
          <ProgressChart />
        </div>

        {/* Potential Additional Section (Example) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activities
          </h2>
          <p className="text-gray-500">
            Here is a summary of recent activities and achievements. (You can
            add a list or more details here)
          </p>
        </div>
      </div>
    </div>
  );
}