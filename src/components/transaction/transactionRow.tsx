"use client";

import { ArrowDownIcon } from "../icons/arrowDownIcon";
import { ArrowUpIcon } from "../icons/arrowUpIcon";
import { EditIcon } from "../icons/editIcon";
import { TrashIcon } from "../icons/trashIcon";

interface TransactionRowProps {
  type: "receita" | "despesa";
  name: string;
  date: string;
  amount: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TransactionRow({
  type,
  name,
  date,
  amount,
  onEdit,
  onDelete,
}: TransactionRowProps) {
  const isReceita = type === "receita";
  const Icon = isReceita ? ArrowUpIcon : ArrowDownIcon;

 return (
  <div className="grid grid-cols-4 items-center py-4 border-b border-backgroundSecondary font-inter text-sm text-textPrimary">
    {/* Transação */}
    <div className="flex items-center gap-sm">
      <div className="rounded-full p-2">
        <Icon className="text-white" />
      </div>
      <span className="font-semibold">{name}</span>
    </div>

    {/* Data */}
    <span>{date}</span>

    {/* Valor */}
    <span className="font-bold">R$ {amount}</span>

    {/* Ações */}
    <div className="flex items-center gap-sm">
      <button onClick={onEdit}>
        <EditIcon className="text-textPrimary hover:text-feedbackInfo" />
      </button>
      <button onClick={onDelete}>
        <TrashIcon className="text-textPrimary hover:text-feedbackDanger" />
      </button>
    </div>
  </div>
);
}