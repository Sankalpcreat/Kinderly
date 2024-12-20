import React from "react";

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2 focus:ring-indigo-500"
      />
      <label className="text-gray-700">{label}</label>
    </div>
  );
};

export default CheckboxInput;
