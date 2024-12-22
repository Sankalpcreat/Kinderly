import React, { useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { authService } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      await authService.passwordReset(email); // Call the password reset service
      setSuccess(true);
    } catch (err) {
      setError("Failed to send password reset email. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Forgot Your Password?
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Enter your email address below, and we will send you a link to reset
          your password.
        </p>
        <div>
          <TextInput
            label="Email Address"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2">
              Password reset email sent successfully.
            </p>
          )}
          <PrimaryButton
            label="Send Reset Link"
            onClick={handlePasswordReset}
            loading={loading}
            className="mt-4 w-full"
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <a
              href="/auth/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}