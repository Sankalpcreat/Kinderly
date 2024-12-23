"use client";

import React from "react";
import Link from "next/link";
import useAuthStore from "../../stores/authStore";
import NavbarItem from "@/components/navbar/NavbarItem";
import MobileNav from "@/components/navbar/MobileNav";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Brand Section */}
        <div>
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
            AppName
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavbarItem label="Home" href="/" />
          <NavbarItem label="Dashboard" href="/dashboard" />
          {user ? (
            <>
              <NavbarItem label={`Welcome, ${user}`} />
              <NavbarItem label="Logout" onClick={logout} />
            </>
          ) : (
            <NavbarItem label="Login" href="/auth/login" />
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </nav>
    </header>
  );
};

export default Navbar;