import React from "react";

export default function Spinner({ size = "md", className = "" }) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-transparent border-primary ${sizeMap[size]}`}
        role="status"
      />
    </div>
  );
}
