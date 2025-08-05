"use client";

import { useEffect, useState } from 'react';
import { JsonService } from '../services/jsonService';
import type { Transaction } from '../models/transaction';
import { TransactionRow } from '@/components/transaction/transactionRow';
import { EditTransactionModal } from './edit/[id]/page';
import { PageContainer } from '@/components/pageContainer';
import { Button } from '@/components/ui/button';

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
    // onRefresh();
    fetchTransactions(); 
  }

  async function handleSave(updated: {
    id: number;
    type: "deposit" | "transfer";
    amount: number;
  }) {
    await JsonService.update(updated.id, updated);
    setEditingTransaction(null);
    // onRefresh();
    fetchTransactions();
  }

  // Formatação de moeda BRL, retornando string como "1.234,56"
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  // Cálculo do saldo total
  const balance = transactions.reduce((acc, t) => {
    if (t.type === "deposit") return acc + t.amount;
    if (t.type === "transfer") return acc - t.amount;
    return acc;
  }, 0);

  return (

    <main className="min-h-[80vh] bg-[#E6F0FA] p-6 sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[70%] xl:justify-items-center">
      {/* Card superior com saldo */}
      <PageContainer
        variant="highlight"
        title="Transações e Depósitos"
        subtitle={currencyFormatter.format(balance)}
      />

      {/* Lista de transações com TransactionRow */}
      <PageContainer variant="sectioned" className="bg-white rounded-xl shadow-md p-6 max-w-full overflow-x-auto w-[100%]" exibirExtratoLink={false}>
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
                date={t.date.split("-").reverse().join("/")}
                amount={currencyFormatter.format(t.amount).replace("R$ ", "")}
                onEdit={() => setEditingTransaction(t)}
                onDelete={() => setDeleteId(t.id)}
              />
            ))
        )}
      </PageContainer>

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
            <div className="w-full flex justify-center">
            <div className="flex justify-center gap-4 w-[60%]">
              <Button variant="primary"
                onClick={() => setDeleteId(null)}
              >
                Cancelar
              </Button>
              <Button variant="danger"
                onClick={() => {
                  if (deleteId !== null) handleDelete(deleteId);
                }}
              >
                Confirmar
              </Button>
            </div>
          </div>
          </div>
        </div>
      )}
    </main>
  );
}