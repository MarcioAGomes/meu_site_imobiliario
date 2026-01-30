"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
// IMPORT RELATIVO CORRIGIDO:
import EditPropertyForm from "./EditPropertyForm"; 

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      const { data } = await supabase
        .from("Property")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();
      if (data) setProperty(data);
      setLoading(false);
    }
    loadProperty();
  }, [resolvedParams.id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Loader2 className="animate-spin text-[#BF953F]" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#2D3436] transition-colors">
          <ArrowLeft size={14} /> Voltar para o painel
        </Link>
        {property && <EditPropertyForm property={property} />}
      </div>
    </main>
  );
}