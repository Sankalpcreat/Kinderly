import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>
        <AuthForm mode="signup" />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login">
              <span className="text-blue-500 hover:underline font-medium">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}