import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const specialOffersData = [
    {
      name: "Winter Special",
      discount: 30,
      menuId: 1,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Summer Splash Sale",
      discount: 20,
      menuId: 2,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Spring Fling",
      discount: 15,
      menuId: 3,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Fall Fiesta",
      discount: 10,
      menuId: 4,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Easter Bash",
      discount: 25,
      menuId: 5,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Black Friday Bonanza",
      discount: 50,
      menuId: 6,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Back to School Sale",
      discount: 20,
      menuId: 7,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Holiday Cheer",
      discount: 30,
      menuId: 8,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Valentine Special",
      discount: 15,
      menuId: 9,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "New Year Extravaganza",
      discount: 40,
      menuId: 10,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  ];

  const promotionsData = [
    {
      name: "Buy One Get One Free",
      description: "Purchase one item and receive another for free.",
      menuId: 1,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "20% off on all beverages",
      description: "Enjoy refreshing beverages with a 20% discount.",
      menuId: 2,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Free Dessert with Meal",
      description: "Get a complimentary dessert when purchasing a meal.",
      menuId: 3,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Loyalty Card Bonus",
      description:
        "Earn double points on every purchase with our loyalty card.",
      menuId: 4,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Happy Hour Deals",
      description: "Discounted prices from 5 PM to 7 PM.",
      menuId: 5,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Free Delivery on Orders Over $50",
      description: "Enjoy free delivery for orders exceeding $50.",
      menuId: 6,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Seasonal Menu Introduction",
      description: "Try our new seasonal flavors this month.",
      menuId: 7,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Family Meal Discount",
      description: "10% off on family meals for four or more.",
      menuId: 8,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Student Discount",
      description: "15% off with a valid student ID.",
      menuId: 9,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Weekend Special",
      description: "Exclusive meals offered only on weekends.",
      menuId: 10,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  ];

  const paymentData = [
    {name: 'Gopay'},
    {name: 'Card'}
  ]

  await prisma.specialOffer.createMany({
    data: specialOffersData,
  });

  await prisma.promotion.createMany({
    data: promotionsData,
  });

  await prisma.paymentMethod.createMany({
    data: paymentData
  })

  console.log(
    `Seeded ${specialOffersData.length} Special Offers, ${promotionsData.length} Promotions`
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
