import React, { useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import useAuthStore from "@/stores/authStore";

interface Profile {
  name: string;
  age: number;
  interests: string[];
}

const OnboardingForm = () => {
  const { user } = useAuthStore(); // Access current user from authStore
  const [profile, setProfile] = useState<Profile>({
    name: "",
    age: 0,
    interests: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!profile.name) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    if (profile.age <= 0) {
      setError("Age must be greater than 0.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Profile added:", { user, ...profile }); // Log user and profile data
      setProfile({ name: "", age: 0, interests: [] }); // Reset form
    } catch (err) {
      setError("An error occurred while saving the profile.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Onboarding for {user || "Guest"}
      </h2>
      <TextInput
        label="Child Name"
        value={profile.name}
        onChange={(value) => setProfile({ ...profile, name: value })}
        placeholder="Enter child's name"
      />
      <TextInput
        label="Child Age"
        value={profile.age.toString()}
        onChange={(value) =>
          setProfile({ ...profile, age: parseInt(value, 10) || 0 })
        }
        placeholder="Enter child's age"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <PrimaryButton
        label="Add Profile"
        onClick={handleSubmit}
        loading={loading}
        disabled={loading}
        color="primary"
      />
    </form>
  );
};

export default OnboardingForm;