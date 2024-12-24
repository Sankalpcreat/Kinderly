"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "../../stores/authStore";

import MobileNav from "@/components/navbar/MobileNav";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand Section with Logo */}
        <div>
          <Link 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/icon.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link 
            href="/dashboard" 
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Dashboard
          </Link>
          {user ? (
            <>
              <span className="text-gray-700 font-medium">
                Welcome, {user}
              </span>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 
                  transition-colors duration-200 font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/auth/login"
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 
                transition-colors duration-200 font-medium text-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;