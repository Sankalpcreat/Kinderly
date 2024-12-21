import React from "react";
import { useAuthStore } from "@/stores/authStore";
import {
  HomeIcon,
  FlagIcon,
  BookOpenIcon,
  LogoutIcon,
} from "@heroicons/react/outline"; // Example icons from Heroicons
import Link from "next/link"; // Import Link from Next.js

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

const Sidebar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
  
    const handleLogout = () => {
      logout()
    }

  return (
    <div className="flex h-full w-64 bg-gray-900 text-white flex-col">
      {/* Branding */}
      <div className="p-4 flex items-center justify-center border-b border-gray-700">
        <span className="text-xl font-semibold">My App</span>
      </div>
      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-gray-700">
          <p className="font-medium text-gray-200">
            Welcome, <span className="text-primary-400">{user.name}</span>
          </p>
        </div>
      )}
      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-1">
                <Link href={item.href} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:ring-2 focus:ring-primary-500">
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout Button (If applicable) */}
      {user && (
        <div className="p-4">
          <button
            className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:ring-2 focus:ring-primary-500"
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