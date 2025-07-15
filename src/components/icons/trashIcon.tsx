"use client";
import React from "react";

interface IconProps {
  className?: string;
  bgColor?: string;
}

export function TrashIcon({
  className = "",
  bgColor = "transparent",
}: IconProps) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}
    >
      <span
        className={`material-symbols-outlined text-xl ${className}`}
      >
        delete
      </span>
    </div>
  );
}
