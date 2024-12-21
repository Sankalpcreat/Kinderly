import React, { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  background?: string;
  centered?: boolean;
  container?: boolean;
  padding?: string;
  className?: string;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  maxWidth = "full",
  background,
  centered,
  container = true,
  padding = "p-6",
  className,
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  const containerClasses = container
    ? `container mx-auto ${maxWidthClasses[maxWidth]} ${centered ? "text-center" : ""}`
    : "";

  const wrapperStyles = `${padding} ${background ? background : ""} ${className ? className : ""}`

  return <div className={containerClasses}><div className={wrapperStyles} >{children}</div></div>;
};

export default ContentWrapper;