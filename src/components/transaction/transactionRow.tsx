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
    <div className="w-full border-b border-backgroundSecondary py-4 text-xs sm:text-sm text-textPrimary font-inter">

      {/* Mobile layout */}
      <div className="flex flex-col sm:hidden gap-2">

        {/* Linha 1: ícone, nome e data */}
        <div className="flex items-center gap-2">
          <div className="rounded-full p-2 bg-transparent">
            <Icon className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{name}</span>
            <span className="text-xs">{date}</span>
          </div>
        </div>

        {/* Linha 2: valor + ações (lado a lado) */}
        <div className="flex items-center ml-[10px] gap-3">
          <span className="font-bold">R$ {amount}</span>
          <button onClick={onEdit}>
            <EditIcon className="text-textPrimary hover:text-feedbackInfo w-4 h-4" />
          </button>
          <button onClick={onDelete}>
            <TrashIcon className="text-textPrimary hover:text-feedbackDanger w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:grid grid-cols-4 items-center w-full">
        {/* Transação */}
        <div className="flex items-center gap-2">
          <div className="rounded-full p-2 bg-transparent">
            <Icon className="text-white" />
          </div>
          <span className="font-semibold">{name}</span>
        </div>

        {/* Data */}
        <span>{date}</span>

        {/* Valor */}
        <span className="font-bold">R$ {amount}</span>

        {/* Ações */}
        <div className="flex justify-end gap-2">
          <button onClick={onEdit}>
            <EditIcon className="text-textPrimary hover:text-feedbackInfo w-5 h-5" />
          </button>
          <button onClick={onDelete}>
            <TrashIcon className="text-textPrimary hover:text-feedbackDanger w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}


