"use client";

import { useEffect, useState } from 'react';
import { JsonService } from '../services/jsonService';
import type { Transaction } from '../models/transaction';
import { TransactionRow } from '@/components/transaction/transactionRow';
import { EditTransactionModal } from './edit/[id]/page';
import { PageContainer } from '@/components/pageContainer';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const router = useRouter();

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

  return (

    <main className="min-h-screen bg-[#E6F0FA] p-6">
      {/* Card superior com saldo */}
      <Button variant="secondary" onClick={() => router.push('/')}>Voltar para a Home</Button>
      <div className="mt-6">
        <PageContainer
          variant="highlight"
          title="Transações e Depósitos"
          subtitle={currencyFormatter.format(balance)}
        />
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
                  date={new Date(t.date).toLocaleDateString('pt-BR')}
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
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
      </div>

    </main>
  );
}