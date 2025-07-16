"use client";

import Image from "next/image";
import { AvatarIcon } from "../icons/avatarIcon";

type HeaderProps = {
  userName: string;
};

export function Header({ userName }: HeaderProps) {
  return (
    <header className="w-full h-[80px] bg-brandSecondary text-backgroundPrimary px-lg py-sm flex items-center justify-between font-inter">
      {/* Logo */}
      <div className="flex items-center gap-xs">
        <Image
          src="/logo_bytebank.png"
          alt="Bytebank Logo"
          width={180}
          height={32}
          priority
        />
      </div>

      {/* Nome do usuário e avatar */}
      <div className="flex items-center gap-xs">
        <span className="text-sm">{userName}</span>
        <AvatarIcon
          className="text-backgroundPrimary text-[26px]"
          bgColor="bg-transparent"
          size="w-[36px] h-[36px]"
        />
      </div>
    </header>
  );
}
