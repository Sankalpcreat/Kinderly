import React, { useState } from "react";
import useUserProfileStore from "../../stores/userProfileStore";

interface Profile {
  name: string;
  age: number;
  interests: string[];
}

const OnboardingForm = () => {
  const { addProfile } = useUserProfileStore();
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
      if(!profile.name) {
         setError("Name is required.");
         setLoading(false);
         return;
      }
      if(profile.age <= 0) {
          setError("Age must be greater than 0.")
            setLoading(false);
         return;
      }
      try {
          await new Promise(resolve => setTimeout(resolve, 1000)); //Simulate loading
          addProfile({ id: Date.now(), ...profile });
          setProfile({ name: "", age: 0, interests: [] });
      } catch (err ) {
        setError(err?.message || "An error occurred");
      } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="child-name"
            className="block text-sm font-medium text-gray-700"
        >
          Child Name
        </label>
        <input
          type="text"
          id="child-name"
          placeholder="Child's Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className={`mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  px-3 py-2  ${
            error.includes("Name") ? "border-red-500 focus:ring-red-500" : ""
            }`}
           aria-invalid={error.includes("Name")}
         aria-describedby={error.includes("Name") ? "child-name-error" : undefined}
        />
           {error.includes("Name") && <p className="mt-1 text-sm text-red-500" id="child-name-error">{error}</p>}
      </div>
      <div>
        <label
          htmlFor="child-age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          type="number"
          id="child-age"
          placeholder="Age"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: +e.target.value })}
            className={`mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 ${
                error.includes("Age") ? "border-red-500 focus:ring-red-500" : ""
            }`}
            aria-invalid={error.includes("Age")}
            aria-describedby={error.includes("Age") ? "child-age-error" : undefined}
        />
          {error.includes("Age") && <p className="mt-1 text-sm text-red-500" id="child-age-error">{error}</p>}
      </div>
        <button
            type="submit"
            className={`bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-200  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
            disabled={loading}
            aria-disabled={loading}
        >
          {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : (
               "Add Profile"
            )}

        </button>
    </form>
  );
};

export default OnboardingForm;