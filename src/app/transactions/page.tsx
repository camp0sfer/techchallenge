"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { JsonService } from '../services/jsonService';
import type { Transaction } from '../models/transaction';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function fetchTransactions() {
    const list = await JsonService.list();
    setTransactions(list);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleDelete(id: number) {
    await JsonService.delete(id);
    setDeleteId(null);
    fetchTransactions();
  }

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  // Cálculo do saldo total
  const balance = transactions.reduce((acc, t) => {
    if (t.type === 'depósito') return acc + t.amount;
    if (t.type === 'transferência') return acc - t.amount;
    return acc;
  }, 0);

  return (
    <main className="min-h-screen bg-[#E6F0FA] p-6">
      {/* Card superior com saldo */}
      <section className="bg-gradient-to-r from-[#0A2A4D] to-[#0E3A75] text-white rounded-xl p-8 mb-8 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transações e Depósitos</h1>
          <p className="text-sm mb-2">Veja todas as movimentações realizadas</p>
          <p className="mt-4 text-lg">
            Total do saldo:{" "}
            <span className="text-lime-400 font-bold text-2xl">
              {currencyFormatter.format(balance)}
            </span>
          </p>
        </div>
        {/* Imagem decorativa opcional */}
        <div className="hidden md:block">
          <img
            src="/images/imagem-bytebank.png"
            alt="Gráfico de finanças"
            width={180}
            height={120}
            style={{ borderRadius: 12 }}
          />
        </div>
      </section>

      {/* Tabela de transações */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#E6F0FA] text-[#0A2A4D]">
              <th className="py-2 px-3 rounded-tl-xl">Tipo</th>
              <th className="py-2 px-3">Valor</th>
              <th className="py-2 px-3">Data</th>
              <th className="py-2 px-3">Ações</th>
              <th className="py-2 px-3 rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
            {transactions.map(t => (
              <tr key={t.id} className="border-b last:border-b-0 hover:bg-[#F5FAFF] transition">
                <td className="py-2 px-3 font-semibold">{t.type}</td>
                <td className="py-2 px-3 text-lime-600 font-bold">{currencyFormatter.format(t.amount)}</td>
                <td className="py-2 px-3">{t.date}</td>
                <td className="py-2 px-3">
                  <Link
                    href={`/transactions/edit/${t.id}`}
                    className="text-yellow-600 hover:underline mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="text-red-600 hover:underline bg-none border-none cursor-pointer"
                    onClick={() => setDeleteId(t.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </section>
      {/* Modal de confirmação de exclusão */}
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-[#0A2A4D]">Confirmar exclusão</h3>
            <p className="mb-6">Tem certeza que deseja excluir esta transação?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-[#0A2A4D]"
                onClick={() => setDeleteId(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(deleteId)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>

  );
}