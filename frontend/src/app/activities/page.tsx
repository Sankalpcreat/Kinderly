import React, { useEffect, useState } from "react";
import { activitiesService } from "@/services/activities";

export default function ActivitiesPage() {
  const [age, setAge] = useState<number>(0);
  const [activities, setActivities] = useState<string[]>([]);

  const handleFetchActivities = async () => {
    const fetchedActivities = await activitiesService.fetchActivities(age);
    setActivities(fetchedActivities);
  };

  return (
    <div className="activities-page">
      <h1 className="text-2xl font-bold mb-6">Activities</h1>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        className="border p-2 rounded-md mb-4"
        placeholder="Enter child's age"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={handleFetchActivities}
      >
        Get Activities
      </button>
      <ul className="mt-4">
        {activities.map((activity, index) => (
          <li key={index} className="border-b py-2">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}