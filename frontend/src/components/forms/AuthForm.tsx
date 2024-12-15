import React, { useState } from "react";
import useAuthStore from "../../stores/authStore";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      login(username);
    } else {
      console.log("Signup user:", username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-4 py-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {type === "login" ? "Login" : "Signup"}
      </button>
    </form>
  );
};

export default AuthForm;
