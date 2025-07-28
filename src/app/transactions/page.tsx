"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { JsonService } from '../services/jsonService';
import type { Transaction } from '../models/transaction';
import { TransactionRow } from '@/components/transaction/transactionRow';
import { EditTransactionModal } from './edit/[id]/page';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

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

  async function handleSave(updated: { id: number; type: "transferência" | "depósito"; amount: number }) {
    // Aqui você atualizaria o backend, por exemplo:
    await JsonService.update(updated.id, updated);

    setEditingTransaction(null);
    fetchTransactions(); // recarrega lista
  }

  // Formatação de moeda BRL, retornando string como "1.234,56"
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  // Cálculo do saldo total
  const balance = transactions.reduce((acc, t) => {
    if (t.type === "depósito") return acc + t.amount;
    if (t.type === "transferência") return acc - t.amount;
    return acc;
  }, 0);

  // Converte data ISO para dd/mm/yyyy
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR");
  }
  

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

      {/* Lista de transações com TransactionRow */}
      <section className="bg-white rounded-xl shadow-md p-6 max-w-full overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-[#0A2A4D]">Últimas Transações</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400">Nenhuma transação encontrada.</p>
        ) : (
          transactions
            .slice()
            .reverse()
            .map((t) => (
              <TransactionRow
                key={t.id}
                type={t.type}
                date={t.date}
                amount={currencyFormatter.format(t.amount).replace("R$ ", "")}
                onEdit={() => setEditingTransaction(t)}
                onDelete={() => setDeleteId(t.id)}
              />
            ))
        )}
      </section>

      <EditTransactionModal
        isOpen={!!editingTransaction}
        transaction={editingTransaction ? {
          id: editingTransaction.id,
          type: editingTransaction.type,
          amount: editingTransaction.amount,
        } : null}
        onClose={() => setEditingTransaction(null)}
        onSave={handleSave}
      />

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
                onClick={() => {
                  if (deleteId !== null) handleDelete(deleteId);
                }}
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