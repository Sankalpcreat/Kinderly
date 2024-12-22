import React from "react";

interface LegendItem {
  label: string;
  color: string; // Accepts either a Tailwind color class or a valid CSS color string
  shape?: "circle" | "square";
}

interface ChartLegendProps {
  items: LegendItem[];
  layout?: "horizontal" | "vertical";
  textSize?: "sm" | "md" | "lg";
  textColor?: string;
  className?: string;
  itemClassName?: string;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  items,
  layout = "horizontal",
  textSize = "md",
  textColor = "text-gray-700",
  className,
  itemClassName,
}) => {
  const layoutClasses = {
    horizontal: "flex justify-center space-x-4",
    vertical: "flex flex-col space-y-2 items-center",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={`${layoutClasses[layout]} mt-4 ${className || ""}`}
      aria-label="Chart Legend"
      role="list"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2 ${itemClassName || ""}`}
          role="listitem"
        >
          {/* Use inline styles for dynamic colors */}
          <div
            className={`w-4 h-4 ${item.shape === "circle" ? "rounded-full" : ""}`}
            style={{ backgroundColor: item.color }}
          ></div>
          <span className={`${textSizeClasses[textSize]} ${textColor}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;