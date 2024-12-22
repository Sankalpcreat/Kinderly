import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/router";
import { authService } from "@/services/auth";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.login);

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await authService.login(username, password); // Call login API
      setUser(user.name); // Update Zustand store
      router.push("/dashboard"); // Navigate to dashboard after successful login
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h1>
        <AuthForm
          type="login"
          onSuccess={async () => {
            const username = "your-username"; // Replace with actual input value
            const password = "your-password"; // Replace with actual input value
            await handleLogin(username, password);
          }}
        />
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