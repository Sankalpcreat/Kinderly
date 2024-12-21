import React from "react";
import AuthForm from "@/components/forms/AuthForm";

export default function SignupPage() {
  return (
    <div className="auth-page">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <AuthForm mode="signup" />
    </div>
  );
}