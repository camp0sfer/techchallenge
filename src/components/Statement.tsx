import Link from "next/link";
import { TransactionRow } from "./transaction/transactionRow";
import { useEffect, useState } from "react";
import { JsonService } from "@/app/services/jsonService";
import { EditTransactionModal } from "@/app/transactions/edit/[id]/page";
import { PageContainer } from "./pageContainer";
import { Button } from "./ui/button";

interface Transaction {
  id: number;
  type: "depósito" | "transferência";
  amount: number;
  date: string;
  name?: string; // caso precise nome da transação
}

interface StatementProps {
  transactions: Transaction[];
  limit?: number;
  onRefresh: () => void;
}

export default function Statement({
  transactions,
  limit = 4,
  onRefresh,
}: StatementProps) {
  const lastTransactions = [...transactions].reverse().slice(0, limit);
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

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
    onRefresh();
  }

  async function handleSave(updated: {
    id: number;
    type: "transferência" | "depósito";
    amount: number;
  }) {
    await JsonService.update(updated.id, updated);
    setEditingTransaction(null);
    onRefresh();
  }

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return (
    <PageContainer
      variant="sectioned"
      className="bg-white p-6 rounded-xl shadow-md max-w-[1200px] w-full"
    >
      {transaction.length === 0 ? (
        <p className="text-gray-400">Nenhuma transação encontrada.</p>
      ) : (
        transaction
          .slice()
          .reverse()
          .slice(0, limit)
          .map((t) => (
            <TransactionRow
              key={t.id}
              type={t.type}
              name={t.name || "Nome da Transação"}
              date={t.date.split("-").reverse().join("/")}
              amount={currencyFormatter.format(t.amount).replace("R$ ", "")}
              onEdit={() => setEditingTransaction(t)}
              onDelete={() => setDeleteId(t.id)}
            />
          ))
      )}
      <EditTransactionModal
        isOpen={!!editingTransaction}
        transaction={
          editingTransaction
            ? {
                id: editingTransaction.id,
                type: editingTransaction.type,
                amount: editingTransaction.amount,
              }
            : null
        }
        onClose={() => setEditingTransaction(null)}
        onSave={handleSave}
      />

      {/* Modal de confirmação de exclusão */}
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-[#0A2A4D]">
              Confirmar exclusão
            </h3>
            <p className="mb-6">
              Tem certeza que deseja excluir esta transação?
            </p>
            <div className="w-full flex justify-center">
              <div className="flex justify-center gap-4">
                <Button variant="primary" onClick={() => setDeleteId(null)}>
                  Cancelar
                </Button>
                <Button
                  variant="danger"
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
    </PageContainer>
  );
}
