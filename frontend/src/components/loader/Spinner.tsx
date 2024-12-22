import React from "react";

interface SpinnerProps {
  color?: string; // e.g., "text-indigo-500"
  size?: "sm" | "md" | "lg" | "xl";
  borderWidth?: string; // e.g., "border-2"
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  color = "text-indigo-500",
  size = "md",
  borderWidth = "border-2",
  speed = "normal",
  className,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const speedClasses = {
    slow: "animate-spin-slow",
    normal: "animate-spin",
    fast: "animate-spin-fast",
  };

  const spinnerClasses = `
    ${sizeClasses[size]}
    ${borderWidth}
    ${color}
    ${speedClasses[speed]}
    ${className ? className : ""}
    rounded-full border-t-transparent border-solid
  `;

  return (
    <div
      className="flex items-center justify-center"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default Spinner;