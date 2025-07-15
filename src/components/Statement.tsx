import Link from 'next/link';

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
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Extrato</h2>
      {lastTransactions.length === 0 ? (
        <p className="mb-6 text-gray-500">Nenhuma transação encontrada.</p>
      ) : (
        <ul className="mb-6">
          {lastTransactions.map(t => (
            <li key={t.id} className="mb-1">
              <span className="font-bold">{t.type}</span> — {currencyFormatter.format(t.amount)} — {t.date}
            </li>
          ))}
        </ul>
      )}
      <Link href="/transactions" className="text-blue-600 hover:underline">
        Ver todas as transações
      </Link>
    </div>
  );
}
