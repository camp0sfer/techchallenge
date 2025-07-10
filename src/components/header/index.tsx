import React from 'react';
import { UserCircle2 } from 'lucide-react'; // ou outro ícone que preferir

interface HeaderProps {
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="w-full bg-[#0A2A4D] text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-green-400 rounded-sm" />
        <span className="text-lg font-semibold">bytebank</span>
      </div>

      {/* Nome do usuário + ícone */}
      <div className="flex items-center space-x-2">
        <span className="text-sm md:text-base">{userName}</span>
        <UserCircle2 size={20} />
      </div>
    </header>
  );
};
