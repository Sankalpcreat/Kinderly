import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { useRouter } from "next/router";
import { authService } from "@/services/auth";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.login);

  const handleSignup = async (username: string, password: string, name: string) => {
    try {
      const user = await authService.signup(username, password, name); // Call signup API
      setUser(user.name); // Update Zustand store
      router.push("/dashboard"); // Navigate to dashboard after successful signup
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>
        <AuthForm
          type="signup"
          onSuccess={async () => {
            const username = "your-username"; // Replace with actual input value
            const password = "your-password"; // Replace with actual input value
            const name = "your-name"; // Replace with actual input value
            await handleSignup(username, password, name);
          }}
        />
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