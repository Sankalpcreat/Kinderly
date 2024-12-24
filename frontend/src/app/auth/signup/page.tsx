"use client"
import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from 'next/navigation';
import { authService } from "@/services/auth";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import RotatingImages from "@/components/auth/RotatingImages";

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.login);

  const handleSignup = async (username: string, password: string, name: string) => {
    try {
      const user = await authService.signup(username, password, name);
      setUser(user.name);
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Rotating Images */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <RotatingImages />
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
            <p className="text-gray-600 mt-2">Start capturing precious moments</p>
          </div>

          <AuthForm
            type="signup"
            onSuccess={async () => {
              const username = "your-username";
              const password = "your-password";
              const name = "your-name";
              await handleSignup(username, password, name);
            }}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login">
                <span className="text-purple-600 hover:text-purple-500 font-medium">
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}