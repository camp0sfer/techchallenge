"use client";
import React from "react";

interface IconProps {
  className?: string;
  bgColor?: string;
}

export function EditIcon({
  className = "",
  bgColor = "transparent",
}: IconProps) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}
    >
      <span
        className={`material-symbols-outlined text-white text-xl ${className}`}
      >
        edit
      </span>
    </div>
  );
}
