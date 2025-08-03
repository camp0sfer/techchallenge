import Link from 'next/link';
import { TransactionRow } from './transaction/transactionRow';

interface Transaction {
  id: number;
  type: "depósito" | "transferência";
  amount: number;
  date: string;
  name?: string; // caso precise nome da transação
}

interface StatementProps {
  transactions: Transaction[];
  limit?: number;
}

export default function Statement({ transactions, limit = 4 }: StatementProps) {
  const lastTransactions = [...transactions].reverse().slice(0, limit);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-[1200px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#0A2A4D]">Últimas transações</h2>
        <Link href="/transactions" className="text-sm text-blue-600 hover:underline">
          Ver extrato completo →
        </Link>
      </div>

      {lastTransactions.length === 0 ? (
        <p className="text-gray-500">Nenhuma transação encontrada.</p>
      ) : (
        <div className="space-y-2">
          {lastTransactions.map((t) => (
            <TransactionRow
              key={t.id}
              type={t.type}
              name={t.name || 'Nome da Transação'}
              date={t.date.split("-").reverse().join("/")}
              amount={currencyFormatter.format(t.amount).replace("R$ ", "")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
