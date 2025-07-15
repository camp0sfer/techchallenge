import Link from 'next/link';
import { JsonService } from '../services/jsonService';

export default async function TransactionsPage() {
  const transactions = await JsonService.list();
  return (
    <div>
      <h1>Transações</h1>
      <Link href="/transactions/new">Adicionar Nova</Link>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {t.type} - R$ {t.amount} - {t.date}
            <Link href={`/transactions/${t.id}`}>Detalhes</Link>
            <Link href={`/transactions/edit/${t.id}`}>Editar</Link>
            {/* <Link href={`/transactions/delete`}>Deletar</Link> (sugestão) abrir um modal de confirmação ?? */}
          </li>
        ))}
      </ul>
    </div>
  );
}