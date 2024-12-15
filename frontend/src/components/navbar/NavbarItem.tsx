import React from "react";

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
        className="px-4 py-2 hover:bg-gray-700 rounded-md text-sm"
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      className="px-4 py-2 hover:bg-gray-700 rounded-md text-sm"
    >
      {label}
    </a>
  );
};

export default NavbarItem;
