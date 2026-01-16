"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- FUNÇÃO PARA CRIAR ---
export async function createProperty(formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as any;
  const price = formData.get("price") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const city = formData.get("city") as string;
  const bedrooms = formData.get("bedrooms") as string;
  const area = formData.get("area") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !imageUrl) return;

  await prisma.property.create({
    data: {
      title,
      type,
      price: parseFloat(price),
      neighborhood,
      city,
      bedrooms: parseInt(bedrooms) || 0,
      area: parseFloat(area),
      imageUrl,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/");
} // <--- A chave que estava faltando estava aqui!

// --- FUNÇÃO PARA ATUALIZAR (EDITAR) ---
export async function updateProperty(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as any;
  const price = formData.get("price") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const area = formData.get("area") as string;
  const bedrooms = formData.get("bedrooms") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await prisma.property.update({
    where: { id },
    data: {
      title,
      type,
      price: parseFloat(price),
      neighborhood,
      bedrooms: parseInt(bedrooms) || 0,
      area: parseFloat(area),
      imageUrl,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin"); 
}

// --- FUNÇÃO PARA DELETAR (RECOMENDADO) ---
export async function deleteProperty(id: string) {
  await prisma.property.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}