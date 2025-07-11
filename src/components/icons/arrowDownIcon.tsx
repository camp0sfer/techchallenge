"use client";
import React from "react";

interface IconProps {
  className?: string;
  bgColor?: string;
}

export function ArrowDownIcon({
  className = "",
  bgColor = "bg-feedbackAction",
}: IconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${bgColor}`}
    >
      <span
        className={`material-symbols-outlined text-white text-xl ${className}`}
      >
        arrow_downward
      </span>
    </div>
  );
}
