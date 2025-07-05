import Link from 'next/link';
import React from 'react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
}

interface StatementProps {
  transactions: Transaction[];
  limit?: number;
}

export default function Statement({ transactions, limit = 5 }: StatementProps) {
  const lastTransactions = [...transactions].reverse().slice(0, limit);
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Extrato</h2>
      <ul className="mb-6">
        {lastTransactions.map(t => (
          <li key={t.id} className="mb-1">
            <span className="font-bold">{t.type}</span> — ${t.amount} — {t.date}
          </li>
        ))}
      </ul>

      <Link href="/transactions" className="text-blue-600 hover:underline">
        Ver todas as transações
      </Link>
    </>
  );
}
