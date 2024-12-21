import React, { useState } from "react";
import useMilestoneStore from "../../stores/milestoneStore";
import { TextInput } from "@/components/ui/TextInput";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const MilestoneForm = () => {
  const { addMilestone } = useMilestoneStore();
  const [milestone, setMilestone] = useState({ title: "", date: "" });
   const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
      setLoading(true);
      if (!milestone.title) {
          setError("Title is required.");
           setLoading(false);
          return;
      }
      if (!milestone.date) {
          setError("Date is required");
          setLoading(false);
        return;
      }
      try {
            await new Promise(resolve => setTimeout(resolve, 1000)); //Simulate loading
            addMilestone({ id: Date.now(), ...milestone });
            setMilestone({ title: "", date: "" });
        } catch (err ) {
          setError(err?.message || "An error occurred");
      } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
            label="Milestone Title"
            value={milestone.title}
            onChange={(value)=> setMilestone({...milestone, title:value})}
            error={error.includes("Title")}
        />
         <TextInput
            label="Milestone Date"
            type="date"
             value={milestone.date}
            onChange={(value)=> setMilestone({...milestone, date:value})}
             error={error.includes("Date")}
         />

        {error && (
            <div className="text-red-500 text-sm">{error}</div>
        )}
          <PrimaryButton
              type="submit"
            label="Add Milestone"
             loading={loading}
             disabled={loading}
         />
    </form>
  );
};

export default MilestoneForm;