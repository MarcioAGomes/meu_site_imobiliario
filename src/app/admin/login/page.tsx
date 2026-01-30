"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Falha no acesso: " + error.message);
      setLoading(false);
    } else {
      // Redireciona e força a atualização para o middleware reconhecer a sessão
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-[#2D3436] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 space-y-10 border border-gray-100">
        <div className="text-center space-y-3">
          <div className="bg-gray-50 w-20 h-20 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="text-[#BF953F]" size={32} />
          </div>
          <h1 className="text-3xl font-black uppercase text-[#2D3436] tracking-tighter">
            Área <span className="text-[#BF953F]">Restrita</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Identificação Administrativa</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-gray-400 ml-2">E-mail Corporativo</label>
            <input 
              type="email" 
              required
              placeholder="admin@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 bg-gray-50 rounded-2xl font-bold text-sm text-[#2D3436] border border-transparent focus:border-[#BF953F] focus:bg-white outline-none transition-all"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-gray-400 ml-2">Senha de Acesso</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 bg-gray-50 rounded-2xl font-bold text-sm text-[#2D3436] border border-transparent focus:border-[#BF953F] focus:bg-white outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2D3436] hover:bg-[#BF953F] text-white font-black py-6 rounded-2xl transition-all uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Entrar no Sistema
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}