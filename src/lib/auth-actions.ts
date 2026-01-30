export async function createNewUser(email: string, pass: string, name: string) {
  try {
    // URL da sua função que você forneceu
    const FUNCTION_URL = 'https://hneqztnczuqmoipymsij.supabase.co/functions/v1/create-user';
    
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Se você definiu ADMIN_KEY nas Settings da Function, descomente a linha abaixo:
        // 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY || '',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
        email_confirm: true,
        user_metadata: { full_name: name }
      })
    });

    const result = await response.json();

    if (!response.ok) {
      // O seu código Deno envia o erro detalhado em 'details'
      const errorMsg = result.details?.message || result.error || 'Erro desconhecido';
      throw new Error(errorMsg);
    }

    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    return { success: false, error: error.message };
  }
}