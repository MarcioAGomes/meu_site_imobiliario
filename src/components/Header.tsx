"use client";

import Image from 'next/image';
import Link from 'next/link'; // Importação que faltava
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png"
            alt="Marcio Gomes - Creci 32943"
            width={60} // Diminuí um pouco para não esticar o header
            height={60}
            className="object-contain"
            priority
          />
          <div className="flex flex-col ml-3">
            <span className="text-lg font-black text-[#2D3436] leading-none uppercase tracking-tighter">
              Marcio <span className="text-[#BF953F]">Gomes</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-1">
              Creci 32943
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-bold text-gray-600 hover:text-[#BF953F] transition-colors">Comprar</Link>
          <Link href="#" className="text-sm font-bold text-gray-600 hover:text-[#BF953F] transition-colors">Anunciar</Link>
          
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          
          {/* Botão com a cor Grafite do logo */}
          <Link 
            href="https://wa.me/5547999999999" 
            className="flex items-center gap-2 bg-[#2D3436] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#BF953F] transition-all shadow-md active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Falar com Marcio
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="#" className="font-bold text-[#2D3436] text-lg">Comprar</Link>
          <Link href="#" className="font-bold text-[#2D3436] text-lg">Anunciar</Link>
          <Link 
            href="https://wa.me/5547999999999" 
            className="bg-[#BF953F] text-white text-center py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" /> (47) 9999-9999
          </Link>
        </div>
      )}
    </nav>
  );
}