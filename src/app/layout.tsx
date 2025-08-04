import "./globals.css";
import { Header } from "../components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#E6F0FA]">
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <Header userName="Joana da Silva Oliveira" />
        <div className="flex">
          <main className="flex-1 p-6 w-full lg:w-[70%] mx-auto">
            <div className="w-full lg:w-[70%] mx-auto">
            {children}
            </div>
            </main>
        </div>
      </body>
    </html>
  );
}
