import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function seed() {
  const email = "someone@example.com"

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash("password", 10)

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  await prisma.waffle.create({
    data: {
      name: "Chocolate",
      image: "chocolate.jpg",
    },
  })

  await prisma.waffle.create({
    data: {
      name: "Monte Cristo",
      image: "monte_cristo.jpg",
    },
  })

  await prisma.waffle.create({
    data: {
      name: "Strawberry",
      image: "strawberry.jpg",
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
