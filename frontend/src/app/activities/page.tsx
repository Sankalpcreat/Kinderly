import React, { useState } from "react";
import { activitiesService } from "@/services/activities";

export default function ActivitiesPage() {
  const [age, setAge] = useState<number>(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedActivities = await activitiesService.fetchActivities(age);
      setActivities(fetchedActivities);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to fetch activities. Please try again.");
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

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
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
            onClick={handleFetchActivities}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Get Activity Ideas"
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
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
              {activities.map((activity, index) => (
                <li
                  key={index}
                  className="bg-gray-50 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800">{activity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activities.length === 0 && !isLoading && !error && age > 0 && (
          <div className="mt-8">
            <p className="text-gray-600 italic">No activities found for this age. Try adjusting the age or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}