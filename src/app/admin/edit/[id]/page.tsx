// src/app/admin/edit/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import EditPropertyForm from "./EditPropertyForm";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id }
  });

  if (!property) notFound();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-black uppercase mb-8">Editar <span className="text-[#BF953F]">Imóvel</span></h1>
        <EditPropertyForm property={property} />
      </div>
    </main>
  );
}