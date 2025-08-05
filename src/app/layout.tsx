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
          <main className="flex-1 p-6 w-full sm:w-[100%] md:w-[100%] lg:w-[70%] mx-auto justify-items-center">
            <div className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[70%]">
            {children}
            </div>
            </main>
        </div>
      </body>
    </html>
  );
}
