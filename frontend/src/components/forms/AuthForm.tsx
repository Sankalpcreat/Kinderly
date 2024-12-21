import React, { useState } from "react";
import useAuthStore from "../../stores/authStore";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextInput } from "@/components/ui/TextInput";

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

    if (!username) {
        setError("Username is required.");
        setLoading(false);
        return;
    }
    if (!password) {
        setError("Password is required");
        setLoading(false)
        return;
    }

    if (type === "signup" && password !== confirmPassword) {
        setError("Password do not match.");
        setLoading(false);
        return;
    }

    try{
      if (type === "login") {
          await login({username,password});
         if(onSuccess){
            onSuccess()
         }
        } else {
             // Simulate signup.
              await new Promise(resolve => setTimeout(resolve, 1000));
              console.log("Signup user:", {username,password});
               if(onSuccess){
                   onSuccess()
                }
          }

     }catch (err) {
          setError(err?.message || "An error occurred");
      } finally {
          setLoading(false);
      }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Username"
          value={username}
          onChange={setUsername}
            error={error.includes("Username")}
        />
        <TextInput
          label="Password"
          value={password}
          type="password"
          onChange={setPassword}
            error={error.includes("Password")}
        />
          {type === "signup" &&
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            onChange={setConfirmPassword}
              error={error.includes("match")}
          />
          }
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <PrimaryButton
            type="submit"
            label={type === "login" ? "Login" : "Signup"}
             loading={loading}
             disabled={loading}
        />
    </form>
  );
};

export default AuthForm;