"use client";

import { useEffect, useState } from 'react';
import { JsonService } from './services/jsonService';
import NewTransactionForm from '../components/NewTransactionForm';
import Statement from '../components/Statement';
import type { Transaction, TransactionType } from './models/transaction';

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await JsonService.list();
      setTransactions(data.map((t: Transaction) => ({
        id: t.id,
        type: t.type,
        amount: t.amount,
        date: t.date
      })));
      setLoading(false);
    }
    fetchTransactions();
  }, []);

  const balance = transactions.reduce((acc, t) => {
    if (t.type === 'depósito') return acc + t.amount;
    if (t.type === 'transferência') return acc - t.amount;
    return acc;
  }, 0);

  async function handleAddTransaction(newTransaction: Omit<Transaction, 'id'>) {
    setLoading(true);
    await JsonService.add(newTransaction);
    const data = await JsonService.list();
    setTransactions(data.map((t: Transaction) => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      date: t.date
    })));
    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Olá, Joana! :)</h1>
      <p className="mb-6">Conta Corrente</p>
      <div className="text-3xl font-mono mb-8">{loading ? '...' : `$${balance.toFixed(2)}`}</div>

      <NewTransactionForm onAdd={handleAddTransaction} />

      <Statement transactions={transactions} />
    </main>
  );
}