"use client";
import React from "react";
import clsx from "clsx";

interface IconProps {
  className?: string;     // controla cor
  bgColor?: string;       // controla bg
  size?: string;          // controla tamanho total
}

export function AvatarIcon({
  className = "",
  bgColor = "transparent",
  size = "w-10 h-10",
}: IconProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full",
        bgColor,
        size
      )}
    >
      <span
        className={clsx("material-symbols-outlined", className)}
          style={{ fontSize: "32px" }} 
      >
        account_circle
      </span>
    </div>
  );
}

