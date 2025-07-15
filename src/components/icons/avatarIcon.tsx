"use client";
import React from "react";

interface IconProps {
  className?: string;
  bgColor?: string;
}

export function AvatarIcon({
  className = "",
  bgColor = "bg-gray-200",
}: IconProps) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}
    >
      <span
        className={`material-symbols-outlined text-xl ${className}`}
      >
        account_circle
      </span>
    </div>
  );
}
