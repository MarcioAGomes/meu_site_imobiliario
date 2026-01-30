"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { createProperty, deleteProperty } from "./actions";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, Trash2, LogOut, CheckCircle2 } from "lucide-react";

export default function AdminPage() {
  const [images, setImages] = useState<string[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase
        .from("Property")
        .select("*")
        .order("createdAt", { ascending: false });
      if (data) setProperties(data);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      const files = e.target.files;
      if (!files) return;

      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}-${file.name}`;
        // CORREÇÃO: Usando o nome exato do seu bucket no Supabase
        const { error: uploadError } = await supabase.storage
          .from("images") 
          .upload(fileName, file);
        
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("images").getPublicUrl(fileName);
        setImages((prev) => [...prev, data.publicUrl]);
      }
    } catch (error: any) {
      alert("Erro no upload: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-700 font-black uppercase tracking-widest">
        Sincronizando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h1 className="text-xl font-black text-[#2D3436] uppercase tracking-tighter">
            Novo <span className="text-[#BF953F]">Imóvel</span>
          </h1>
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push("/login"))}
            className="text-red-500 text-[10px] font-black uppercase flex items-center gap-2 hover:opacity-70 transition-all"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>

        <form
          id="add-form"
          action={async (fd) => {
            try {
              // Garante que as imagens do state sejam incluídas no FormData
              images.forEach(url => fd.append("imageUrls", url));
              await createProperty(fd);
              setImages([]);
              (document.getElementById("add-form") as HTMLFormElement).reset();
              window.location.reload(); 
            } catch (e: any) {
              alert(e.message);
            }
          }}
          className="space-y-8"
        >
          {/* SEÇÃO 1: UPLOAD */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">
              Mídias do Imóvel
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <label className="aspect-square border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-[#BF953F] hover:bg-gold-50 transition-all group">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                {uploading ? (
                  <Loader2 className="animate-spin text-[#BF953F]" />
                ) : (
                  <UploadCloud className="text-gray-300 group-hover:text-[#BF953F]" size={32} />
                )}
                <span className="text-[9px] font-black text-gray-400 uppercase mt-2">Upload</span>
              </label>

              {images.map((url, i) => (
                <div key={i} className="aspect-square relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-in fade-in zoom-in duration-300">
                  <img src={url} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle2 size={12} />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-red-500 shadow-sm"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEÇÃO 2: INFORMAÇÕES GERAIS */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">
              Informações Gerais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Tipo de Imóvel</label>
                <select name="type" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F] appearance-none" required defaultValue="">
                  <option value="" disabled>Escolha o tipo...</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Comercial">Ponto Comercial</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Título do Anúncio</label>
                <input name="title" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" placeholder="Ex: Sobrado Moderno" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Preço Venda (R$)</label>
                <input name="price" type="number" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" placeholder="0,00" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Bairro</label>
                <input name="neighborhood" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" placeholder="Ex: Jardim América" required />
              </div>

              {/* Grid de Características (Conforme sua solicitação) */}
              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Área m²</label>
                  <input name="area" type="number" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Dorms</label>
                  <input name="bedrooms" type="number" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Suítes</label>
                  <input name="suites" type="number" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Banheiros</label>
                  <input name="bathrooms" type="number" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Vagas</label>
                  <input name="garage" type="number" className="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 focus:ring-[#BF953F]" required />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Descrição</label>
                <textarea name="description" className="p-4 bg-gray-50 rounded-2xl outline-none font-medium text-gray-700 focus:ring-2 focus:ring-[#BF953F] h-32 resize-none" />
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: BOTÃO PUBLICAR */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#2D3436] hover:bg-[#BF953F] text-white py-6 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.3em] transition-all shadow-xl shadow-gray-200 active:scale-[0.98] disabled:opacity-50"
          >
            {uploading ? "Aguarde o Upload..." : "Publicar Imóvel no Site"}
          </button>
        </form>

        {/* Gerenciar Imóveis Ativos */}
        <div className="space-y-4 pt-10">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
            Gerenciar Imóveis Ativos
          </h3>
          {properties.length === 0 ? (
            <p className="text-center py-10 text-gray-400 font-bold uppercase text-[10px]">Nenhum imóvel disponível</p>
          ) : (
            properties.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-3xl flex justify-between items-center shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                    <img src={p.imageUrls?.[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 uppercase text-xs block leading-tight">{p.title}</span>
                    <span className="text-[9px] font-bold text-[#BF953F] uppercase tracking-widest">{p.neighborhood}</span>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if(confirm("Deseja excluir este imóvel?")) {
                      await deleteProperty(p.id);
                      window.location.reload();
                    }
                  }}
                  className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}