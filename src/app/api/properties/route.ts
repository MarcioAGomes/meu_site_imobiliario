import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Força o Next.js a buscar dados novos no banco a cada requisição
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Busca os imóveis do seu banco no Supabase
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Erro na API de propriedades:", error);
    return NextResponse.json(
      { error: "Erro ao buscar imóveis no banco de dados" }, 
      { status: 500 }
    );
  }
}