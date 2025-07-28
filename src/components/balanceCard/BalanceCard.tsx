"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface BalanceCardProps {
  balance: number;
  title?: string;
  description?: string;
}

export function BalanceCard({
  balance,
  title = "Transações e Depósitos",
  description = "Veja todas as movimentações realizadas",
}: BalanceCardProps) {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return (
    <section
      className={clsx(
        "bg-gradient-to-r from-[#0A2A4D] to-[#0E3A75]",
        "text-white rounded-xl p-8 mb-8 flex justify-between items-center shadow-lg"
      )}
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm mb-2">{description}</p>
        <p className="mt-4 text-lg">
          Total do saldo:{" "}
          <span className="text-lime-400 font-bold text-2xl">
            {currencyFormatter.format(balance)}
          </span>
        </p>
      </div>
      <div className="hidden md:block">
        <Image
          src="/images/imagem-bytebank.png"
          alt="Gráfico de finanças"
          width={180}
          height={120}
          className="rounded-xl"
        />
      </div>
    </section>
  );
}
