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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        {type === "login" ? "Welcome Back!" : "Create Your Account"}
      </h2>

      <TextInput
        label="Username"
        value={username}
        onChange={setUsername}
        placeholder="Enter your username"
        error={error.includes("Username")}
      />

      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
        error={error.includes("Password")}
      />

      {type === "signup" && (
        <TextInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your password"
          error={error.includes("match")}
        />
      )}

      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}

      <PrimaryButton
        type="submit"
        label={type === "login" ? "Login" : "Sign Up"}
        loading={loading}
        disabled={loading}
        className="w-full"
      />

      {type === "signup" && (
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-indigo-500 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      )}

      {type === "login" && (
        <p className="text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-indigo-500 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;