import Link from 'next/link';
import { Bed, Ruler } from 'lucide-react';

export default function PropertyCard({ property }: { property: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group relative">
      
      {/* Imagem com Link e Efeito Zoom */}
      <Link href={`/property/${property.id}`}>
        <div className="relative h-56 overflow-hidden cursor-pointer">
          <img 
            src={property.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge Dinâmico (Dourado) - Agora inclui Terreno */}
          <div className="absolute top-3 left-3 bg-[#BF953F] text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-lg z-10">
            {property.type === 'HOUSE' && 'Casa'}
            {property.type === 'APARTMENT' && 'Apartamento'}
            {property.type === 'LAND' && 'Terreno'}
          </div>
        </div>
      </Link>
      
      {/* Conteúdo */}
      <div className="p-5">
        <Link href={`/property/${property.id}`}>
          <h3 className="text-lg font-bold text-[#2D3436] line-clamp-1 group-hover:text-[#BF953F] transition-colors cursor-pointer">
            {property.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1">{property.neighborhood}, {property.city}</p>
        
        {/* Ícones de Características Condicionais */}
        <div className="mt-4 flex items-center gap-4 text-gray-600 text-xs border-y border-gray-50 py-3">
          {property.type !== 'LAND' && (
            <span className="flex items-center gap-1 font-bold italic">
              <Bed size={14} className="text-[#BF953F]" /> {property.bedrooms} qtos
            </span>
          )}
          <span className="flex items-center gap-1 font-bold italic">
            <Ruler size={14} className="text-[#BF953F]" /> {property.area} m²
          </span>
        </div>

        {/* Preço e Ação */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Valor</span>
            <span className="text-xl font-black text-[#BF953F]">
              R$ {property.price.toLocaleString('pt-BR')}
            </span>
          </div>
          
          <Link href={`/property/${property.id}`}>
            <button className="bg-[#2D3436] text-white text-[10px] px-4 py-2.5 rounded-lg hover:bg-[#BF953F] transition-all shadow-md font-bold uppercase tracking-tight active:scale-95">
              Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}