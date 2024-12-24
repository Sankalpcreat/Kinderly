import React, { useState } from "react";
import useAuthStore from "../../stores/authStore";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextInput from "@/components/inputs/TextInput";

interface AuthFormProps {
  type: "login" | "signup";
  onSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim()) {
      setError("Username is required.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    if (type === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (type === "login") {
        await login({ username, password });
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // Simulate signup process
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Signup successful:", { username, password });
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError(err?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
          aria-label="Username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          error={error.includes("Username")}
        />

        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          aria-label="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          error={error.includes("Password")}
        />

        {type === "signup" && (
          <TextInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm your password"
            aria-label="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            error={error.includes("match")}
          />
        )}

        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              ></path>
            </svg>
            {error}
          </div>
        )}

        <PrimaryButton
          type="submit"
          label={type === "login" ? "Login" : "Sign Up"}
          loading={loading}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};

export default AuthForm;
