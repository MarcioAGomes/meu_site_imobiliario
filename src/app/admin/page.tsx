"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { createProperty } from "./actions";
import { UploadCloud, Loader2, Home, TreePine, Building2, CheckCircle2 } from "lucide-react";

export default function AdminPage() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [propertyType, setPropertyType] = useState("APARTMENT");

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('properties')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('properties')
        .getPublicUrl(fileName);

      setImageUrl(urlData.publicUrl);
    } catch (error) {
      alert('Erro no upload da imagem. Verifique sua conexão e as chaves do Supabase.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Cabeçalho */}
        <div className="bg-[#2D3436] p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">
              Novo <span className="text-[#BF953F]">Imóvel</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase mt-1">Painel de Cadastro Marcio Gomes</p>
          </div>
          {propertyType === 'LAND' ? <TreePine className="text-[#BF953F]" size={32} /> : <Home className="text-[#BF953F]" size={32} />}
        </div>

        <form action={createProperty} className="p-8 space-y-8">
          {/* ÁREA DE UPLOAD */}
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Imagem Principal</label>
            <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center ${imageUrl ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-[#BF953F]'}`}>
              {imageUrl ? (
                <div className="relative w-full text-center">
                  <img src={imageUrl} className="w-full h-48 object-cover rounded-xl shadow-md mb-4" />
                  <input type="hidden" name="imageUrl" value={imageUrl} />
                  <div className="flex justify-center gap-2">
                    <span className="flex items-center gap-1 text-green-600 font-bold text-xs uppercase"><CheckCircle2 size={14}/> Foto carregada</span>
                    <button type="button" onClick={() => setImageUrl("")} className="text-red-500 font-bold text-xs uppercase hover:underline">Remover</button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center py-6 w-full">
                  {uploading ? (
                    <Loader2 className="animate-spin text-[#BF953F]" size={40} />
                  ) : (
                    <>
                      <UploadCloud className="text-gray-300 group-hover:text-[#BF953F]" size={48} />
                      <span className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest">Clique para selecionar a foto</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                </label>
              )}
            </div>
          </div>

          {/* DADOS TÉCNICOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Título do Anúncio</label>
              <input name="title" placeholder="Ex: Casa Moderna no Glória" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#BF953F] font-medium" />
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Tipo de Imóvel</label>
              <select 
                name="type" 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs uppercase cursor-pointer focus:ring-2 focus:ring-[#BF953F]"
              >
                <option value="APARTMENT">Apartamento</option>
                <option value="HOUSE">Casa</option>
                <option value="LAND">Terreno</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Preço (R$)</label>
              <input name="price" type="number" placeholder="Somente números" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#BF953F]" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Bairro</label>
              <input name="neighborhood" placeholder="Ex: Atiradores" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#BF953F]" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Área total (m²)</label>
              <input name="area" type="number" placeholder="Ex: 360" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#BF953F]" />
            </div>

            {/* Lógica Condicional de Quartos */}
            {propertyType !== "LAND" ? (
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Número de Quartos</label>
                <input name="bedrooms" type="number" placeholder="Ex: 3" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#BF953F]" />
              </div>
            ) : (
              <input type="hidden" name="bedrooms" value="0" />
            )}

            <input type="hidden" name="city" value="Joinville" />
          </div>

          <button 
            type="submit" 
            disabled={!imageUrl || uploading} 
            className="w-full bg-[#2D3436] hover:bg-[#BF953F] disabled:bg-gray-200 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-[10px] shadow-xl active:scale-[0.98]"
          >
            {uploading ? "Aguarde o Upload..." : "Publicar no Site"}
          </button>
        </form>
      </div>
    </main>
  );
}