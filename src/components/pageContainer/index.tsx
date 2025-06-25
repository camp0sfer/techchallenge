'use client';
import React from 'react';
import clsx from 'clsx';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  bgColor?: string; // Ex: "bg-white", "bg-[#e2f1f0]", etc
  withBackgroundPattern?: boolean;
};

export function PageContainer({
  children,
  className = '',
  bgColor = 'bg-white',
  withBackgroundPattern = false,
}: PageContainerProps) {
  return (
    <div
      className={clsx(
        'relative rounded-md p-6',
        bgColor,
        className
      )}
    >
      {withBackgroundPattern && (
        <>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[url('/pattern.png')] bg-no-repeat bg-contain opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[url('/pattern.png')] bg-no-repeat bg-contain opacity-40 pointer-events-none" />
        </>
      )}
      {children}
    </div>
  );
}
