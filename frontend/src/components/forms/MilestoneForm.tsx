import React, { useState } from "react";
import useMilestoneStore from "../../stores/milestoneStore";

const MilestoneForm = () => {
  const { addMilestone } = useMilestoneStore();
  const [milestone, setMilestone] = useState({ title: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMilestone({ id: Date.now(), ...milestone });
    setMilestone({ title: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Milestone Title"
        value={milestone.title}
        onChange={(e) => setMilestone({ ...milestone, title: e.target.value })}
        className="border px-4 py-2 w-full"
      />
      <input
        type="date"
        value={milestone.date}
        onChange={(e) => setMilestone({ ...milestone, date: e.target.value })}
        className="border px-4 py-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Milestone
      </button>
    </form>
  );
};

export default MilestoneForm;
