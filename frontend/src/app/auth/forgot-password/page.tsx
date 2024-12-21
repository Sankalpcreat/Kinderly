import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Forgot Your Password?
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          We are sorry you are having trouble signing in. Please contact our support team to reset your password.
        </p>
        <div className="text-center">
          <a
            href="mailto:support@example.com" // Replace with your actual support email
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}