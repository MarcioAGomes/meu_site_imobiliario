import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Importamos o Header que você criou
import Header from "@/components/Header"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcio Gomes - Creci 32943 | Imóveis em Joinville",
  description: "Encontre as melhores casas e apartamentos em Joinville e região.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* O Header fica aqui para aparecer em todas as páginas */}
        <Header />
        
        {children}
      </body>
    </html>
  );
}