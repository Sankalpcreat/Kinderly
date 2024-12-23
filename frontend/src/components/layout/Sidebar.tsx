"use client"
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import useThemeStore from "@/stores/themeStore";
import {
  HomeIcon,
  FlagIcon,
  BookOpenIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline"; // Example icons from Heroicons

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
  {
    label: "Milestones",
    href: "/milestones",
    icon: <FlagIcon className="h-5 w-5" />,
  },
  { label: "Stories", href: "/stories", icon: <BookOpenIcon className="h-5 w-5" /> },
];

const Sidebar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  const themeIcon = theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />;

  const sidebarClass = theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white";
  const hoverClass = theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800";

  return (
    <div className={`flex h-full w-64 ${sidebarClass} flex-col transition-colors`}>
      {/* Branding */}
      <div className={`p-4 flex items-center justify-between border-b ${theme === "light" ? "border-gray-300" : "border-gray-700"}`}>
        <span className="text-xl font-semibold">My App</span>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`p-2 rounded-md ${hoverClass} focus:outline-none focus:ring-2 focus:ring-primary-500`}
        >
          {themeIcon}
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className={`p-4 border-b ${theme === "light" ? "border-gray-300" : "border-gray-700"}`}>
          <p className="font-medium">
            Welcome, <span className="text-primary-400">{user.name}</span>
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-1">
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md ${hoverClass} focus:outline-none focus:bg-primary-500`}
                aria-label={item.label}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      {user && (
        <div className="p-4">
          <button
            className={`flex items-center w-full px-4 py-2 rounded-md ${hoverClass} focus:outline-none focus:ring-2 focus:ring-primary-500`}
            onClick={handleLogout}
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;