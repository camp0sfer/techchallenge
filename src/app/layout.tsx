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
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <Header userName="Joana da Silva Oliveira" />
        <div className="flex">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
