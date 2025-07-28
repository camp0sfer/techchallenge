"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EditIcon } from "@/components/icons/editIcon";
import { TrashIcon } from "@/components/icons/trashIcon";
import { Sidebar } from "@/components/sidebar";
import { PageContainer } from "@/components/pageContainer";
import { ToggleGroup } from "@/components/ui/toggle";
import { useState } from "react";
import { AvatarIcon } from "@/components/icons/avatarIcon";
import { ArrowUpIcon } from "@/components/icons/arrowUpIcon";
import { GearIcon } from "@/components/icons/gearIcon";
import { ArrowDownIcon } from "@/components/icons/arrowDownIcon";
import { ArrowRightIcon } from "@/components/icons/arrowRightIcon";
import { TransactionRow } from "@/components/transaction/transactionRow";

export default function TestComponents() {
  const [selected, setSelected] = useState("receita");

  return (
    <div className="w-full max-[640px]:w-[90vw] bg-gray-50 p-8 space-y-6 min-h-screen font-inter">


      <h1 className="text-2xl font-bold">Testes de Componentes</h1>

      <section className="space-x-4 max-w-full overflow-x-auto">

        <h2 className="text-lg font-semibold mb-2">Botões</h2>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="tertiary" disabled>
          Disabled
        </Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="info">Info</Button>
        <Button variant="action">Action</Button>
      </section>
      <hr className="my-6 border-t border-gray-300" />

      <h2 className="text-lg font-semibold mb-2">Toggle</h2>
      <section className="space-x-4 max-w-full overflow-x-auto">

        <ToggleGroup
          value={selected}
          onChange={setSelected}
          options={[
            { label: "Receita", value: "receita", color: "success" },
            { label: "Despesa", value: "despesa", color: "action" },
          ]}
        />
      </section>
      <hr className="my-6 border-t border-gray-300" />

      <section className="space-x-4 max-w-full overflow-x-auto">

        <h2 className="text-lg font-semibold mb-2">Input</h2>
        <Input label="Nome" placeholder="Digite seu nome" />
        <Input label="Email" error="Campo obrigatório" />
      </section>
      <hr className="my-6 border-t border-gray-300" />

      <section className="space-x-4 max-w-full overflow-x-auto">

        <h2 className="text-lg font-semibold mb-2">Select</h2>
        <Select
          label="Tipo de transação"
          options={[
            { label: "Câmbio de Moeda", value: "moeda" },
            { label: "DOC/TED", value: "doc", bold: true },
            { label: "Empréstimo", value: "emprestimo" },
          ]}
        />
      </section>
      <hr className="my-6 border-t border-gray-300" />

      <section className="space-x-4 max-w-full overflow-x-auto">

        <h2 className="text-h5 font-semibold mb-sm text-textPrimary">Ícones</h2>
        <div className="flex flex-wrap gap-md items-center">

          {/* Edição */}
          <EditIcon
            bgColor="bg-feedbackSuccess hover:bg-feedbackSuccessHover"
            className="text-white"
          />
          <EditIcon
            bgColor="bg-brandPrimary hover:bg-brandPrimaryHover"
            className="text-white"
          />

          {/* Lixeira */}
          <TrashIcon
            bgColor="bg-brandPrimary hover:bg-brandPrimaryHover"
            className="text-white"
          />
          <TrashIcon
            bgColor="bg-ui-backgroundSecondary hover:bg-brandTertiaryHover"
            className="text-textPrimary"
          />

          {/* Avatar */}
          <AvatarIcon
            bgColor="bg-ui-backgroundSecondary hover:bg-brandPrimaryHover"
            className="text-feedbackAction"
          />
          <AvatarIcon bgColor="transparent" className="text-textPrimary" />

          {/* Setas */}
          <ArrowUpIcon
            bgColor="bg-backgroundSecondary hover:bg-brandPrimaryHover"
            className="text-textPrimary hover:text-white"
          />
          <ArrowDownIcon
            bgColor="bg-backgroundSecondary hover:bg-brandPrimaryHover"
            className="text-textPrimary hover:text-white"
          />
          <ArrowRightIcon
            bgColor="bg-backgroundSecondary hover:bg-brandPrimaryHover"
            className="text-textPrimary hover:text-white"
          />

          {/* Engrenagem */}
          <GearIcon
            bgColor="bg-brandPrimary hover:bg-brandPrimaryHover"
            className="text-white"
          />
        </div>
      </section>

      <hr className="my-6 border-t border-gray-300" />

      <section className="space-x-4 max-w-full overflow-x-auto">

        <h2 className="text-lg font-semibold mb-2">Transaction Row</h2>
        <TransactionRow
          type="depósito"
          name="Nome da Transação"
          date="05/07/2025"
          amount="1.200,00"
          onEdit={() => console.log("editar")}
          onDelete={() => console.log("deletar")}
        />
        <TransactionRow
          type="transferência"
          name="Nome da Transação"
          date="05/07/2025"
          amount="1.200,00"
          onEdit={() => console.log("editar")}
          onDelete={() => console.log("deletar")}
        />
      </section>
      <hr className="my-6 border-t border-gray-300" />

      <section className="space-x-4 max-w-full overflow-x-auto">

        <h2 className="text-h5 font-semibold text-textPrimary">Containers</h2>
        <PageContainer
          variant="highlight"
          title="Joana"
          subtitle="R$ 2.500,00"
        />

        <PageContainer
          variant="sectioned"
          title="Últimas transações"
          subtitle="Ver extrato completo"
          className="max-w-[1200px] w-full"
        >
          <TransactionRow
            type="transferência"
            name="Nome da Transação"
            date="05/07/2025"
            amount="1.500,00"
            onEdit={() => console.log("editar")}
            onDelete={() => console.log("deletar")}
          />
          <TransactionRow
            type="transferência"
            name="Nome da Transação"
            date="05/07/2025"
            amount="980,00"
          />
          <TransactionRow
            type="transferência"
            name="Nome da Transação"
            date="05/07/2025"
            amount="140,00"
          />
          <TransactionRow
            type="transferência"
            name="Nome da Transação"
            date="04/07/2025"
            amount="160,00"
          />
        </PageContainer>

        <PageContainer variant="form" title="Adicionar nova transação">
          <div className="flex flex-col gap-md">
            <Input label="Descrição" placeholder="Ex: Compra no mercado" />
            <Input label="Valor" placeholder="R$ 0,00" />
            <Select
              label="Tipo de transação"
              options={[
                { label: "Selecione o tipo de transação", value: "" },
                { label: "Receita", value: "receita", bold: true },
                { label: "Despesa", value: "despesa", bold: true },
              ]}
            />
            <Button variant="primary">Adicionar Transação</Button>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
