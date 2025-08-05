import { TransactionType } from "@/app/models/transaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface EditTransactionModalProps {
  isOpen: boolean;
  transaction: {
    id: number;
    type: TransactionType;
    amount: number; // valor em número
  } | null;
  onSave: (updatedTransaction: {
    id: number;
    type: TransactionType;
    amount: number;
  }) => void;
  onClose: () => void;
}

export function EditTransactionModal({
  isOpen,
  transaction,
  onSave,
  onClose,
}: EditTransactionModalProps) {
  const [type, setType] = useState<TransactionType>("deposit");
  const [amount, setAmount] = useState("");
  const transactionOptions = [
    { label: "Depósito", value: "deposit", bold: true },
    { label: "Transferência", value: "transfer", bold: true },
  ];

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
        <h2 className="text-xl font-semibold mb-4 text-[#0A2A4D]">
          Editar Transação
        </h2>

        <div className="mb-4">
          <Select
            label="Tipo de transação"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            options={transactionOptions}
          />
        </div>

        <div className="mb-4">
          <Input
            label="Valor"
            type="text"
            value={amount}
            onChange={(e) => setAmount(formatBRLInput(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            inputMode="numeric"
            required
            placeholder="Digite aqui o valor da transação"
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="flex justify-end gap-4 w-[60%]">
            <Button variant="danger" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
