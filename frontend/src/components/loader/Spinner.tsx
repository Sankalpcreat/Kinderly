import React from "react";

interface SpinnerProps {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  borderWidth?: number;
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  color = "indigo-500",
  size = "md",
  borderWidth = 2,
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
    rounded-full
    border-t-${borderWidth}
    border-b-${borderWidth}
    border-${color}
    ${sizeClasses[size]}
    ${speedClasses[speed]}
    ${className ? className : ""}
  `;

  return (
    <div className="flex items-center justify-center" aria-live="polite" aria-busy="true">
      <div className={spinnerClasses}></div>
    </div>
  );
};

export default Spinner;