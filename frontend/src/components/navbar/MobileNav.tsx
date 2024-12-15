import React, { useState } from "react";
import useAuthStore from "../../stores/authStore";

const MobileNav = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="block md:hidden bg-gray-800 text-white p-4">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-between w-full"
      >
        <span className="text-lg font-bold">AppName</span>
        <svg
          className={`w-6 h-6 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="mt-4 space-y-2">
          <a href="/" className="block">
            Home
          </a>
          <a href="/dashboard" className="block">
            Dashboard
          </a>
          {user ? (
            <>
              <span className="block">Welcome, {user}</span>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <a href="/auth/login" className="block text-blue-500">
              Login
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
