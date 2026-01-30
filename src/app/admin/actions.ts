"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set({ name, value, ...options }) },
        remove(name, options) { cookieStore.set({ name, value: "", ...options }) },
      },
    }
  );
}

// FUNÇÃO PARA CRIAR
export async function createProperty(formData: FormData) {
  const supabase = await getSupabase();

  const propertyData = {
    title: formData.get("title") as string,
    type: formData.get("type") as string || "Casa",
    price: Number(formData.get("price")) || 0,
    neighborhood: formData.get("neighborhood") as string,
    area: Number(formData.get("area")) || 0,
    bedrooms: Number(formData.get("bedrooms")) || 0,
    suites: Number(formData.get("suites")) || 0,
    bathrooms: Number(formData.get("bathrooms")) || 0,
    garage: Number(formData.get("garage")) || 0,
    description: formData.get("description") as string || "",
    imageUrls: formData.getAll("imageUrls") as string[],
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase.from("Property").insert([propertyData]);

  if (error) {
    console.error("Erro no Banco (Create):", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// FUNÇÃO PARA ATUALIZAR (Adicionada agora)
export async function updateProperty(id: string, formData: FormData) {
  const supabase = await getSupabase();

  const propertyData = {
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    price: Number(formData.get("price")) || 0,
    neighborhood: formData.get("neighborhood") as string,
    area: Number(formData.get("area")) || 0,
    bedrooms: Number(formData.get("bedrooms")) || 0,
    suites: Number(formData.get("suites")) || 0,
    bathrooms: Number(formData.get("bathrooms")) || 0,
    garage: Number(formData.get("garage")) || 0,
    description: formData.get("description") as string || "",
    imageUrls: formData.getAll("imageUrls") as string[],
    updatedAt: new Date().toISOString(), // Opcional: registrar a data de edição
  };

  const { error } = await supabase
    .from("Property")
    .update(propertyData)
    .eq("id", id);

  if (error) {
    console.error("Erro no Banco (Update):", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// FUNÇÃO PARA DELETAR
export async function deleteProperty(id: string) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("Property").delete().eq("id", id);
  
  if (error) {
    console.error("Erro no Banco (Delete):", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}