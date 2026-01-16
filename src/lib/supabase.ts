import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// COLOQUE OS LOGS AQUI PARA TESTAR NO TERMINAL
console.log("URL:", supabaseUrl);
console.log("KEY STATUS:", supabaseAnonKey ? "Encontrada" : "Vazia");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Chaves não encontradas no .env")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)