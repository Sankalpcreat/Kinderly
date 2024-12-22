import React, { useState } from "react";
import useMilestoneStore from "../../stores/milestoneStore";
import TextInput from "@/components/inputs/TextInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const MilestoneForm = () => {
  const { addMilestone } = useMilestoneStore();
  const [milestone, setMilestone] = useState({ title: "", date: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!milestone.title.trim()) {
      setError("Title is required.");
      setLoading(false);
      return;
    }

    if (!milestone.date.trim()) {
      setError("Date is required.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      addMilestone({ id: Date.now(), ...milestone });
      setMilestone({ title: "", date: "" });
    } catch (err) {
      setError("An error occurred while adding the milestone.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add a New Milestone
      </h2>
      <TextInput
        label="Milestone Title"
        value={milestone.title}
        onChange={(value) => setMilestone({ ...milestone, title: value })}
        placeholder="Enter a milestone title"
        error={error.includes("Title")}
      />
      <TextInput
        label="Milestone Date"
        type="date"
        value={milestone.date}
        onChange={(value) => setMilestone({ ...milestone, date: value })}
        error={error.includes("Date")}
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <PrimaryButton
        type="submit"
        label="Add Milestone"
        loading={loading}
        disabled={loading}
        className="w-full"
      />
    </form>
  );
};

export default MilestoneForm;