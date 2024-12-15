import React, { useState } from "react";
import useUserProfileStore from "../../stores/userProfileStore";

const OnboardingForm = () => {
  const { addProfile } = useUserProfileStore();
  const [profile, setProfile] = useState({ name: "", age: 0, interests: [] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProfile({ id: Date.now(), ...profile });
    setProfile({ name: "", age: 0, interests: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Child's Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        className="border px-4 py-2 w-full"
      />
      <input
        type="number"
        placeholder="Age"
        value={profile.age}
        onChange={(e) => setProfile({ ...profile, age: +e.target.value })}
        className="border px-4 py-2 w-full"
      />
      <button type="submit" className="bg-green-300 text-white px-4 py-2">
        Add Profile
      </button>
    </form>
  );
};

export default OnboardingForm;
