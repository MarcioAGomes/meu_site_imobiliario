"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { updateProperty } from "../../actions";
import { UploadCloud, Loader2, Save, X, MapPin, Maximize2 } from "lucide-react";

export default function EditPropertyForm({ property }: { property: any }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(property.imageUrls || []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setUploading(true);
    const files = Array.from(e.target.files || []);
    const uploadPromises = files.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('properties').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('properties').getPublicUrl(fileName);
      return publicUrl;
    });
    const urls = await Promise.all(uploadPromises);
    setImageUrls((prev) => [...prev, ...urls]);
    setUploading(false);
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <form action={updateProperty.bind(null, property.id)} className="p-8 space-y-8">
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase text-gray-400">Galeria ({imageUrls.length})</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <img src={url} className="w-full h-full object-cover rounded-2xl border" />
                <button type="button" onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={12} /></button>
                <input type="hidden" name="imageUrls" value={url} />
              </div>
            ))}
            <label className="border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#BF953F] aspect-square bg-gray-50">
              {uploading ? <Loader2 className="animate-spin text-[#BF953F]" /> : <UploadCloud className="text-gray-300" />}
              <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Título</label>
            <input name="title" defaultValue={property.title} className="w-full p-4 bg-gray-50 rounded-xl font-bold text-sm text-[#2D3436] outline-none border border-gray-100" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Bairro</label>
            <input name="neighborhood" defaultValue={property.neighborhood} className="w-full p-4 bg-gray-50 rounded-xl font-bold text-sm text-[#2D3436] outline-none border border-gray-100" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Área (m²)</label>
            <input name="area" type="number" defaultValue={property.area} className="w-full p-4 bg-gray-50 rounded-xl font-bold text-sm text-[#2D3436] outline-none border border-gray-100" />
          </div>
        </div>

        <button type="submit" disabled={uploading} className="w-full bg-[#2D3436] hover:bg-[#BF953F] text-white font-black py-5 rounded-2xl transition-all uppercase text-[10px] tracking-[0.3em]">
          {uploading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}