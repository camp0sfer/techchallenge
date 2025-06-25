"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EditIcon } from "@/components/icons/editIcon";
import { EyeIcon } from "@/components/icons/eyeIcon";
import { TrashIcon } from "@/components/icons/trashIcon";
import { Sidebar } from "@/components/sidebar";
import { ClosedEyeIcon } from "@/components/icons/closedEyeIcon";
import { PageContainer } from "@/components/pageContainer";

export default function TestComponents() {
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-2xl font-bold">Testes de Componentes</h1>

      <section className="space-x-4">
        <h2 className="text-lg font-semibold mb-2">Botões</h2>
        <Button variant="primary">Concluir</Button>
        <Button variant="success">Concluir</Button>
        <Button variant="danger">Excluir</Button>
        <Button variant="neutral" disabled>
          Inativo
        </Button>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold mb-2">Inputs/Select</h2>
        <Input label="Nome" placeholder="Digite seu nome" />
        <Input label="Email" error="Campo obrigatório" />
      </section>

      <section className="space-y-2">
        <Select
          label="Tipo de transação"
          options={[
            { label: "Câmbio de Moeda", value: "moeda" },
            { label: "DOC/TED", value: "doc", bold: true },
            { label: "Empréstimo", value: "emprestimo" },
          ]}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Ícones</h2>
        <div className="flex gap-4 items-center">
          <EditIcon bgColor="bg-green-500" className="text-white" />
          <EditIcon bgColor="bg-[#004D61]" className="text-white" />
          <EyeIcon className="w-6 h-6 text-[#FF5031]" />
          <ClosedEyeIcon className="w-6 h-6 text-green-500" />
          <TrashIcon bgColor="bg-[#004D61]" className="text-white" />
          <TrashIcon bgColor="bg-gray-300" className="text-black" />
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Sidebars</h2>
        <Sidebar
          title="Menu Principal"
          centered={true}
          showIcons={false}
          width="w-[300px]" 
          items={[
            { label: "Início", active: true },
            { label: "Transferências" },
            { label: "Investimentos" },
            { label: "Outros serviços" },
          ]}
        />
        <br/>
        <Sidebar
          title="Extrato"
          variant="card"
          showIcons={false}
          width="w-[300px]" 
          titleActions={[
            <button
              key="edit"
              onClick={() => alert("editar")}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <EditIcon className="text-gray-600" />
            </button>,
            <button
              key="delete"
              onClick={() => alert("excluir")}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <TrashIcon className="text-gray-600" />
            </button>,
          ]}
          items={[
            { label: "Depósito - R$ 150" },
            { label: "Depósito - R$ 100" },
            { label: "Transferência - R$ 500" },
          ]}
        />
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Containers</h2>
        <PageContainer bgColor="bg-[#004d61] text-white w-full max-w-[600px] h-[300px]">
          <p>Aqui vai o conteúdo</p>
        </PageContainer>
        <br/>
        <PageContainer bgColor="bg-black text-white w-full max-w-[300px] h-[500px]">
          <p>Aqui vai o conteúdo</p>
        </PageContainer>
      </section>
    </div>
  );
}
