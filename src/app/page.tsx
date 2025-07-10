"use client";

import { useEffect, useState } from 'react';
import { JsonService } from './services/jsonService';
import NewTransactionForm from '../components/NewTransactionForm';
import Statement from '../components/Statement';
import type { Transaction } from './models/transaction';
import Image from 'next/image';

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

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
    setShowNotification(true); // ← ativa notificação aqui
    setTimeout(() => setShowNotification(false), 3000);
  }

  return (
    <main className="min-h-screen bg-[#E6F0FA] p-6">
      {/* Card superior com saldo */}
      <section className="bg-gradient-to-r from-[#0A2A4D] to-[#0E3A75] text-white rounded-xl p-8 mb-8 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2">Olá, Joana!</h1>
          <p className="text-sm mb-2">Bem-vindo(a) de volta</p>
          <p className="text-xs text-gray-300">Este é o resumo da sua vida financeira.</p>
          <p className="mt-4 text-lg">
            Seu saldo atual é{" "}
            <span className="text-lime-400 font-bold text-2xl">
              {loading ? "..." : currencyFormatter.format(balance)}
            </span>
          </p>
        </div>
        {/* Gráfico ilustrativo ou imagem pode ser adicionada aqui */}
        <div className="hidden md:block">
          <Image
            src="/images/imagem-bytebank.png"
            alt="Gráfico de finanças"
            width={330}
            height={280}
            priority
          />
        </div>
      </section>

      {/* Grid com extrato + nova transação */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!loading && <Statement transactions={transactions} />}
        {!loading && <NewTransactionForm onAdd={handleAddTransaction} />}
      </section>

      {/* 🔔 Notificação visível sempre que ativa */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-[9999]">
          Transação concluída com sucesso!
        </div>
      )}
    </main>
  );
}