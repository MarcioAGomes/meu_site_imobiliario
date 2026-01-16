import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, BedDouble, Square, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// No Next.js 15, o params é uma Promise
export default async function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id: id },
  });

  if (!property) notFound();

  const message = encodeURIComponent(`Olá Marcio, gostaria de mais informações sobre: ${property.title}`);
  const whatsappUrl = `https://wa.me/5547999999999?text=${message}`;

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-[#BF953F] transition-all">
          <ArrowLeft size={20} /> Voltar para a vitrine
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={property.imageUrl || ""} alt={property.title} fill className="object-cover" priority />
          </div>
          <div className="mt-8">
            <h1 className="text-4xl font-black text-[#2D3436] uppercase tracking-tighter">{property.title}</h1>
            <p className="flex items-center gap-2 text-gray-500 mt-2">
              <MapPin size={18} className="text-[#BF953F]" /> {property.neighborhood}, {property.city}
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-10 bg-[#2D3436] p-8 rounded-3xl shadow-2xl text-white">
            <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">Valor de Investimento</span>
            <div className="text-4xl font-black text-[#BF953F] mt-2">
              R$ {property.price.toLocaleString('pt-BR')}
            </div>
            <a href={whatsappUrl} target="_blank" className="flex items-center justify-center gap-3 bg-[#BF953F] hover:bg-[#a68235] text-white w-full py-4 rounded-xl font-bold transition-all mt-8">
              <Phone size={20} /> AGENDAR VISITA
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}