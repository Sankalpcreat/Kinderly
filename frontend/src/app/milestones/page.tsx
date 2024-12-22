import React, { useEffect } from "react";
import MilestoneForm from "@/components/forms/MilestoneForm";
import MilestoneChart from "@/components/charts/MilestoneChart";
import useMilestoneStore from "@/stores/milestoneStore";
import { milestonesService } from "@/services/milestones";

export default function MilestonesPage() {
  const { milestones, addMilestone } = useMilestoneStore();

  // Fetch milestones when the page loads
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const fetchedMilestones = await milestonesService.fetchMilestones();
        fetchedMilestones.forEach((milestone) => addMilestone(milestone));
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      }
    };

    fetchMilestones();
  }, [addMilestone]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Track Your Child is Milestones
      </h1>
      {milestones.length === 0 ? (
        <p className="text-gray-600">No milestones logged yet. Start by adding one!</p>
      ) : (
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
      )}
    </div>
  );
}