import Link from "next/link";

export default function NotFound() {
  return (
	<div>
		<h1 className="flex items-center justify-center">Página não encontrada</h1>
		<p className="text-center font-bold mt-9 tex-6xl">Desculpe, a página que você está procurando não existe.</p>
		<Link href="/">
			Voltar para Home
		</Link>
	</div>
  );
}