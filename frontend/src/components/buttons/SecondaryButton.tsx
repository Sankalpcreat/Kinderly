import React, { ReactNode } from "react";

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
  color?: "default" | "contrast" | "gray";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  onClick,
  color = "default",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  type = "button",
  className,
}) => {
  const colorClasses = {
    default:
      "bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 text-gray-700 border border-gray-300",
    contrast:
      "bg-white hover:bg-gray-50 focus:ring-gray-300 text-gray-800 border border-gray-300",
    gray: "bg-gray-200 hover:bg-gray-300 focus:ring-gray-300 text-gray-800 border border-gray-300",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };

  const buttonClasses = `${colorClasses[color] || colorClasses.default} ${
    sizeClasses[size] || sizeClasses.md
  } rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
    className || ""
  } flex items-center justify-center`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-disabled={disabled}
      aria-busy={loading}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {loading ? (
        <div
          className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600"
          aria-label="Loading"
        ></div>
      ) : (
        <span>{label}</span>
      )}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default SecondaryButton;