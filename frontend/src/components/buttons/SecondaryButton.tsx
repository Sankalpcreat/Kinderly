import React from "react";

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded border"
  >
    {label}
  </button>
);

export default SecondaryButton;
