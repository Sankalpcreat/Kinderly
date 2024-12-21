import React from "react";
import AuthForm from "@/components/forms/AuthForm";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <AuthForm mode="login" />
    </div>
  );
}