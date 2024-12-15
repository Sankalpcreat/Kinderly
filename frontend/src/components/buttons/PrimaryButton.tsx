import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
    {label}
  </button>
);

export default PrimaryButton;
