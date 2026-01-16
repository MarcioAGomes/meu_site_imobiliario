"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { updateProperty } from "../../actions"; // Ajuste o caminho se necessário
import { UploadCloud, Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditPropertyForm({ property }: { property: any }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(property.imageUrl);
  const [propertyType, setPropertyType] = useState(property.type);

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
      alert('Erro ao carregar nova imagem.');
    } finally {
      setUploading(false);
    }
  }

  // Função para lidar com o submit e passar o ID
  const handleSubmit = async (formData: FormData) => {
    await updateProperty(property.id, formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <form action={handleSubmit} className="p-8 space-y-8">
        <input type="hidden" name="imageUrl" value={imageUrl} />

        {/* Preview e Upload da Imagem */}
        <div className="space-y-3">
          <label className="block text-[10px] font-black uppercase text-gray-400">Imagem do Imóvel</label>
          <div className="relative group">
            <img src={imageUrl} className="w-full h-64 object-cover rounded-2xl shadow-inner border border-gray-100" />
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl text-white">
              {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud size={32} />}
              <span className="text-xs font-bold mt-2 uppercase">Trocar Imagem</span>
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Título</label>
            <input name="title" defaultValue={property.title} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#BF953F]" />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Tipo</label>
            <select 
              name="type" 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none font-bold text-xs uppercase"
            >
              <option value="APARTMENT">Apartamento</option>
              <option value="HOUSE">Casa</option>
              <option value="LAND">Terreno</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Preço (R$)</label>
            <input name="price" type="number" defaultValue={property.price} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Bairro</label>
            <input name="neighborhood" defaultValue={property.neighborhood} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Área (m²)</label>
            <input name="area" type="number" defaultValue={property.area} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none" />
          </div>

          {propertyType !== "LAND" && (
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Quartos</label>
              <input name="bedrooms" type="number" defaultValue={property.bedrooms} required className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none" />
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Link href="/admin" className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl text-center uppercase text-[10px] hover:bg-gray-200 transition-all">
            Cancelar
          </Link>
          <button type="submit" disabled={uploading} className="flex-[2] bg-[#2D3436] hover:bg-[#BF953F] text-white font-black py-4 rounded-xl transition-all uppercase text-[10px] flex items-center justify-center gap-2 shadow-lg">
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}