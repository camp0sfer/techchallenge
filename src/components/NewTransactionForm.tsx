"use client";

import { useState } from "react";
import type { TransactionType } from "../app/models/transaction";

interface NewTransactionFormProps {
  onAdd: (newTransaction: { type: TransactionType; amount: number; date: string }) => Promise<void>;
}

function getTodayISO() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function NewTransactionForm({ onAdd }: NewTransactionFormProps) {
  const [type, setType] = useState<TransactionType>("depósito");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setType("depósito");
    setAmount(0);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await onAdd({ type, amount, date: getTodayISO() });
    setLoading(false);
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Nova Transação</h2>
      <div className="mb-2">
        <label className="mr-2">Selecione o tipo de transação:</label>
        <select
          value={type}
          onChange={e => setType(e.target.value as TransactionType)}
          className="border rounded px-2 py-1"
        >
          <option value="depósito">Depósito</option>
          <option value="transferência">Transferência</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">Valor:</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border rounded px-2 py-1"
          min="0"
          step="0.01"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
        {loading ? "Aguarde..." : "Concluir transação"}
      </button>
    </form>
  );
}
