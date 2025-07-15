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
    <div className="flex items-center justify-between py-4 border-b border-ui-background-secondary font-inter text-sm text-ui-text-primary">
      <div className="flex items-center gap-sm">
        <div className={`rounded-full p-2`}>
          <Icon className="text-white" />
        </div>
        <span className="font-semibold">{name}</span>
      </div>
      <div className="flex items-center gap-md">
        <span>{date}</span>
        <span className="font-bold">R$ {amount}</span>
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
