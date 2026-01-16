import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.property.deleteMany()

  await prisma.property.create({
    data: {
      title: 'Casa de Luxo no Atiradores',
      type: 'HOUSE',
      price: 1500000,
      city: 'Joinville',
      neighborhood: 'Atiradores',
      bedrooms: 4,
      area: 320,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    }
  })

  console.log('Dados inseridos com sucesso!')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())