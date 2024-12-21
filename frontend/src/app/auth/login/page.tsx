import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h1>
        <AuthForm mode="login" />
        <div className="mt-4 text-sm">
          <Link href="/auth/forgot-password">
            <p className="text-blue-500 hover:underline text-center">
              Forgot your password?
            </p>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Do not have an account?{" "}
            <Link href="/auth/signup">
              <span className="text-blue-500 hover:underline font-medium">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}