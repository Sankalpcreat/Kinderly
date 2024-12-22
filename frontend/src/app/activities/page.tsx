import React, { useState, useEffect } from "react";
import useActivityStore from "@/stores/activityStore";
import { activitiesService } from "@/services/activities";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function ActivitiesPage() {
  const { activities, addActivity } = useActivityStore();
  const [age, setAge] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedActivities = await activitiesService.fetchActivities(age);
      fetchedActivities.forEach((activity) => addActivity(activity));
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to fetch activities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Pre-load activities based on age if needed
  }, [age]);

  return (
    <div className="container mx-auto p-6 md:p-10">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Fun Activities for Your Little One
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <label htmlFor="age" className="block text-gray-700 font-medium">
            Enter Child Age:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-3 w-full md:w-auto focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 3"
          />
          <PrimaryButton
            label={isLoading ? "Loading..." : "Get Activity Ideas"}
            onClick={handleFetchActivities}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        {activities.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Here are some fun activities for a {age}-year-old:
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="bg-gray-50 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="font-bold text-gray-800">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Suggested Age: {activity.suggestedAge}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activities.length === 0 && !isLoading && !error && age > 0 && (
          <div className="mt-8">
            <p className="text-gray-600 italic">
              No activities found for this age. Try adjusting the age or check
              back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}