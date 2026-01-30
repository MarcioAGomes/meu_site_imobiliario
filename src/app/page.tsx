import { supabase } from "@/lib/supabase";

// Garante que a página busque dados novos sempre que for carregada
export const revalidate = 0;

export default async function HomePage() {
  // Busca os imóveis do banco de dados
  const { data: properties, error } = await supabase
    .from("Property")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Erro ao carregar imóveis:", error.message);
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Imóveis Disponíveis</h1>

        {/* Grid de Imóveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              {/* Imagem do Imóvel */}
              <div className="h-48 overflow-hidden bg-gray-200">
                {property.imageUrls && property.imageUrls.length > 0 ? (
                  <img 
                    src={property.imageUrls[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    Sem imagem disponível
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {property.neighborhood}
                </p>

                {/* Dentro do card do imóvel */}
                <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100 my-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                  <span className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-[12px]">📐</span>
                  {Number(property.area || 0)}m²
                </div>
                
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                  <span className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-[12px]">🛏️</span>
                  {Number(property.bedrooms || 0)} Dorms
                </div>

                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                  <span className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-[12px]">🚿</span>
                  {Number(property.bathrooms || 0)} BWC
                </div>

                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter text-gray-400">
                  <span className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center text-[12px]">🚗</span>
                  {Number(property.garage || 0)} Vagas
                </div>
              </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {Number(property.price).toLocaleString('pt-BR')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {property.area} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem caso não existam imóveis */}
        {(!properties || properties.length === 0) && (
          <div className="text-center py-20 text-gray-500">
            <p>Nenhum imóvel encontrado no momento.</p>
          </div>
        )}
      </div>
    </main>
  );
}