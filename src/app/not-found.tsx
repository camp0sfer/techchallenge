import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0A2A4D] to-[#0E3A75] text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-center mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link
        href="/"
        className="bg-white text-[#0A2A4D] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
