import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  await prisma.menuItem.deleteMany();
  await prisma.truckStop.deleteMany();
  await prisma.truck.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const roles = ['admin', 'user', 'operator'];
  await Promise.all(roles.map((role) => prisma.role.create({ data: { name: role } })));

  const dbAdmin = await prisma.user.create({
    data: {
      email: 'admin@me.com',
      username: 'admin',
      email_verified: true,
      roles: {
        connect: {
          name: 'admin',
        },
      },
    },
  });

  await Promise.all(
    Array.from({ length: 1000 }).map(async (_, i) => {
      const name = faker.company.name();
      const address = await prisma.location.create({
        data: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
      });
      return prisma.truck.create({
        data: {
          name,
          slug: faker.helpers.slugify(name),
          description: faker.lorem.paragraphs(),
          published: true,
          avatar: faker.image.urlLoremFlickr(),
          ownerId: dbAdmin.id,
          priceRange: faker.helpers.arrayElement(['$', '$$', '$$$']),
          phone: faker.phone.number(),
          views: faker.number.int(),
          cuisineType: faker.helpers.arrayElement([
            'American',
            'Mexican',
            'Italian',
            'Asian',
            'Other',
          ]),
          addressId: address.id,
          menuItems: {
            create: Array.from({ length: 10 }).map(() => ({
              name: faker.commerce.productName(),
              photo: faker.image.urlLoremFlickr({ category: 'food' }),
              description: faker.commerce.productDescription(),
              price: +faker.commerce.price({ dec: 0 }),
            })),
          },
        },
      });
    }),
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
