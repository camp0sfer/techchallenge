import "./globals.css";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Header userName="Joana da Silva Oliveira" />
        <div className="flex">
          <Sidebar
            title=""
            variant="default"
            centered={true}
            items={[
              { label: "Início", active: true },
              { label: "Transferências" },
              { label: "Investimentos" },
              { label: "Outros serviços" },
            ]}
          />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
