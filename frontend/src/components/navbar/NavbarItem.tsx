"use client";

import React from "react";
import Link from "next/link";

interface NavbarItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href, onClick }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 hover:bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        aria-label={label}
      >
        {label}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className="px-4 py-2 hover:bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
        {label}
      </Link>
    );
  }

  return null; // Graceful fallback if neither href nor onClick is provided
};

export default NavbarItem;