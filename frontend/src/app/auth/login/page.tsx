"use client"
import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from 'next/navigation';
import { authService } from "@/services/auth";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import RotatingImages from "@/components/auth/RotatingImages";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.login);

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await authService.login(username, password);
      setUser(user.name);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Rotating Images */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <RotatingImages />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Please enter your details to sign in</p>
          </div>

          <AuthForm
            type="login"
            onSuccess={async () => {
              const username = "your-username";
              const password = "your-password";
              await handleLogin(username, password);
            }}
          />

          <div className="mt-6">
            <Link href="/auth/forgot-password">
              <span className="text-sm text-purple-600 hover:text-purple-500">
                Forgot password?
              </span>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Do not have an account?{" "}
              <Link href="/auth/signup">
                <span className="text-purple-600 hover:text-purple-500 font-medium">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}