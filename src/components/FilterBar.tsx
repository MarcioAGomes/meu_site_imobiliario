"use client";

import { Search, ChevronDown } from "lucide-react";

export default function FilterBar({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        
        {/* Busca por Texto */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por título ou bairro..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#BF953F] outline-none transition-all text-[#2D3436] font-medium"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>

        {/* Dropdown de Tipo de Imóvel */}
        <div className="relative w-full md:w-64">
          <select 
            className="w-full appearance-none px-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#BF953F] outline-none transition-all text-[#2D3436] font-bold uppercase text-xs tracking-widest cursor-pointer"
            onChange={(e) => onFilterChange({ type: e.target.value })}
          >
            <option value="ALL">Todos os Tipos</option>
            <option value="HOUSE">Casas</option>
            <option value="APARTMENT">Apartamentos</option>
            <option value="LAND">Terrenos</option>
          </select>
          <ChevronDown className="absolute right-4 top-3.5 text-[#BF953F] pointer-events-none" size={18} />
        </div>

      </div>
    </div>
  );
}