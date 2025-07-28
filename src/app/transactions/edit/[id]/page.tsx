import { TransactionType } from "@/app/models/transaction";
import { useState, useEffect } from "react";



interface EditTransactionModalProps {
  isOpen: boolean;
  transaction: {
    id: number;
    type: TransactionType;
    amount: number; // valor em número
  } | null;
  onSave: (updatedTransaction: { id: number; type: TransactionType; amount: number }) => void;
  onClose: () => void;
}

export function EditTransactionModal({ isOpen, transaction, onSave, onClose }: EditTransactionModalProps) {
  const [type, setType] = useState<TransactionType>("depósito");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount.toFixed(2).replace(".", ","));
    }
  }, [transaction]);

  function formatBRLInput(value: string) {
    // Remove tudo que não for número ou vírgula
    let v = value.replace(/[^0-9,]/g, "");

    // Substitui múltiplas vírgulas por uma só
    const parts = v.split(",");
    if (parts.length > 2) v = parts[0] + "," + parts.slice(1).join("");

    return v;
  }

  function parseBRLToNumber(value: string) {
    // Converte string BRL com vírgula para number
    return Number(value.replace(".", "").replace(",", "."));
  }

  function handleSave() {
    const parsedAmount = parseBRLToNumber(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Por favor, informe um valor válido maior que zero.");
      return;
    }

    if (transaction) {
      onSave({
        id: transaction.id,
        type,
        amount: parsedAmount,
      });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#0A2A4D]">Editar Transação</h2>

        <label className="block mb-2 font-medium text-sm text-gray-700">
          Tipo de transação
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="depósito">Depósito</option>
            <option value="transferência">Transferência</option>
          </select>
        </label>

        <label className="block mb-4 font-medium text-sm text-gray-700">
          Valor
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(formatBRLInput(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="0,00"
            inputMode="decimal"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-[#0A2A4D]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
