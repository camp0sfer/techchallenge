"use client";

import { useEffect, useState } from "react";
import type { TransactionType } from "../app/models/transaction";
import { ToggleGroup } from "./ui/toggle";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";

interface NewTransactionFormProps {
  onAdd: (newTransaction: { type: TransactionType; amount: number; date: string }) => Promise<void>;
}

function getTodayISO() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function NewTransactionForm({ onAdd }: NewTransactionFormProps) {
  const [type, setType] = useState<TransactionType>("depósito");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const transactionOptions = [
    { label: "Depósito", value: "depósito", bold: true },
    { label: "Transferência", value: "transferência", bold: true },
  ];

  function formatToBRL(value: string) {
    const num = Number(value.replace(/\D/g, "")) / 100;
    if (isNaN(num)) return "";
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw);
  }
  function resetForm() {
    setType("depósito");
    setAmount("");
  }

  async function confirmTransaction() {
  setLoading(true);
  setShowModal(false);
  const valorNumerico = Number(amount) / 100;

  const transactionData = {
    type,
    amount: valorNumerico,
    date: getTodayISO(),
  };


  await onAdd(transactionData);
  setLoading(false);
  resetForm();
}


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setShowModal(true); // Abre modal ao invés de enviar direto
  }

  return (
    <>
      {/* Formulário */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md relative">
        <h2 className="text-lg font-semibold text-[#0A2A4D] mb-4">Adicionar nova transação</h2>

        <div className="mb-4">
          <Input
            label="Valor"
            type="text"
            value={amount ? formatToBRL(amount) : ""}
            onChange={handleAmountChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            inputMode="numeric"
            required
            placeholder="Digite aqui o valor da transação"
          />
        </div>

        <div className="mb-4">
          <Select
            label="Tipo de transação"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            options={transactionOptions}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? "Aguarde..." : "Adicionar Transação"}
        </Button>
      </form>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">Confirmar transação</h3>
            <p className="mb-6">Tem certeza que deseja adicionar esta transação?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmTransaction}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
