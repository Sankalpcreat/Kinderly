import React, { useState } from "react";
import Link from "next/link";
import useAuthStore from "../../stores/authStore";

const MobileNav = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="block md:hidden bg-gray-800 text-white p-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-between w-full"
        aria-expanded={isMenuOpen}
        aria-label="Toggle mobile navigation"
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

      {/* Menu Content */}
      {isMenuOpen && (
        <div className="mt-4 space-y-2">
          <Link
            href="/"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Dashboard
          </Link>
          {user ? (
            <>
              <span className="block px-4 py-2 rounded-md text-gray-300">
                Welcome, {user}
              </span>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="block px-4 py-2 rounded-md text-blue-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;