"use client";

import { useEffect, useState } from 'react';
import { JsonService } from './services/jsonService';
import NewTransactionForm from '../components/NewTransactionForm';
import Statement from '../components/Statement';
import type { Transaction } from './models/transaction';

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await JsonService.list();
      setTransactions(data);
      setLoading(false);
    }
    fetchTransactions();
  }, []);

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  const balance = transactions.reduce((acc, t) => {
    if (t.type === 'depósito') return acc + t.amount;
    if (t.type === 'transferência') return acc - t.amount;
    return acc;
  }, 0);

  async function handleAddTransaction(transaction: Omit<Transaction, 'id'>) {
    setLoading(true);
    await JsonService.add(transaction);
    const data = await JsonService.list();
    setTransactions(data);
    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <div className="mb-8 p-4 border rounded">
        <h1 className="text-2xl font-bold mb-4">Olá, Joana! :)</h1>
        <p className="mb-6">Conta Corrente</p>
        <div className="text-3xl font-mono mb-8">{loading ? '...' : currencyFormatter.format(balance)}</div>
      </div>
      {loading ? null : <NewTransactionForm onAdd={handleAddTransaction} />}
      {loading ? null : <Statement transactions={transactions} />}
    </main>
  );
}