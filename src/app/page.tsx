import { prisma } from "@/lib/prisma";
import PropertyList from "@/components/PropertyList";

export const revalidate = 0;

export default async function Home() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section mantém-se em Server Component (Ótimo para SEO) */}
      <section className="bg-[#2D3436] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BF953F]/10 blur-[120px] rounded-full"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Encontre seu <span className="text-[#BF953F]">novo lar</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Curadoria exclusiva de imóveis em Joinville com a credibilidade Marcio Gomes.
          </p>
        </div>
      </section>

      {/* Listagem com os filtros interativos */}
      <div className="mt-[-40px] relative z-20">
        <PropertyList initialProperties={properties} />
      </div>
    </main>
  );
}