import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const categories = [
  {
    description: "",
    name: "Accounting/Finance",
  },
  {
    description: "",
    name: "Art/Media/Design",
  },
  {
    description: "",
    name: "Customer Service",
  },
  {
    description: "",
    name: "Manual Jobs",
  },
  {
    description: "",
    name: "Technology/IT",
  },
  {
    description: "",
    name: "Writing/Editing",
  },
  {
    description: "",
    name: "Marketing",
  },
  {
    description: "",
    name: "Education/Training",
  },
  {
    description: "",
    name: "Law",
  },
  {
    description: "",
    name: "Human Services",
  },
  {
    description: "",
    name: "Construction",
  },
  {
    description: "",
    name: "Facilities",
  },
  {
    description: "",
    name: "Hairdressing and beauty",
  },
];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Admin',
      role: 'ADMIN'
    },
  });


  const john = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      firstName: 'JOhn',
      lastName: 'Doe',
      role: 'USER'
    },
  });

  categories.forEach(async c => {
    const category = await prisma.category.upsert({
      where: { name: c.name },
      update: { description: c.description },
      create :{
        user: {
          connect: {
            id: admin.id
          }
        },
        name: c.name,
        description: c.description
      }
    })

    const job = await prisma.job.create({
      data: {
        title: `${c.name} Expert`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: random(100, 1000),
        address: "Address",
        categories: {
          connect: { id: category.id }
        },
        images: [
          `uploads/samples/${random(1, 6)}.jpeg`
        ],
        user: {
          connect: {
            id: john.id
          }
        },
      }
    })
  });
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