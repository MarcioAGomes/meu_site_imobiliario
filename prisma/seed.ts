import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  // Limpa os dados existentes para evitar duplicatas
  await prisma.property.deleteMany()

  await prisma.property.create({
    data: {
      title: 'Apartamento Moderno no Centro',
      price: 450000.0,
      type: 'Apartamento',
      intent: 'Venda',
      city: 'Florianópolis',
      bedrooms: 2,
      area: 75.5,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
    },
  })

  await prisma.property.create({
    data: {
      title: 'Casa de Luxo com Piscina',
      price: 1200000.0,
      type: 'Casa',
      intent: 'Venda',
      city: 'Joinville',
      bedrooms: 4,
      area: 250.0,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
    },
  })

  await prisma.property.create({
    data: {
      title: 'Studio Charmoso',
      price: 2500.0,
      type: 'Apartamento',
      intent: 'Aluguel',
      city: 'Curitiba',
      bedrooms: 1,
      area: 35.0,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
    },
  })

  console.log('Seed finalizado com sucesso! 3 imóveis criados.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })