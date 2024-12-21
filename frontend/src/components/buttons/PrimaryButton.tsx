import React, { ReactNode } from "react";

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "danger" | "gray";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  color = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  type = "button",
  className,
}) => {
  const colorClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-700 focus:ring-primary-300 text-white",
    secondary:
      "bg-secondary-500 hover:bg-secondary-700 focus:ring-secondary-300 text-white",
    danger:
      "bg-red-500 hover:bg-red-700 focus:ring-red-300 text-white",
      gray: "bg-gray-400 hover:bg-gray-500 focus:ring-gray-300 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };


  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`${colorClasses[color]} ${sizeClasses[size]}  rounded-md shadow-sm focus:outline-none focus:ring-2  transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className ? className : ""} flex items-center justify-center`}
      aria-disabled={disabled}
    >
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
          {loading ? (
               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
          ) : (
              <span>{label}</span>
          )}
          {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default PrimaryButton;