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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#0A2A4D]">Últimas transações</h2>
        <Link href="/transactions" className="text-sm text-blue-600 hover:underline">
          Ver extrato completo →
        </Link>
      </div>
      {lastTransactions.length === 0 ? (
        <p className="text-gray-500">Nenhuma transação encontrada.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {lastTransactions.map((t) => (
            <li key={t.id} className="py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${
                    t.type === "depósito" ? "bg-green-500" : "bg-pink-500"
                  }`}
                >
                  {t.type === "depósito" ? "↑" : "↓"}
                </span>
                <span className="text-sm font-medium text-gray-700">Nome da Transação</span>
              </div>
              <div className="text-sm text-gray-600 text-right">
                <p>{t.date}</p>
                <p className="font-bold">{currencyFormatter.format(t.amount)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}