import React from 'react';

interface HeaderProps {
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="w-full bg-zinc-900 text-white px-6 py-4 flex justify-end items-center shadow-md">
            <div className="flex items-center space-x-3">
            <span className="text-sm md:text-base">{userName}</span>
            <span>icone</span>
        </div>
    </header>
  );
};
