import { Meal } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const CreateMealService = async (
  data: Omit<Meal, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.meal.create({
    data,
  });
  return result;
};

export const GetsMealsService = async (isAdmin: boolean, userId: string) => {
  let whereCondition: any = {};

  if (!isAdmin) {
    const providerProfile = await prisma.providerProfile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!providerProfile) {
      return [];
    }

    whereCondition.providerId = providerProfile.id;
  }

  const result = await prisma.meal.findMany({
    where: whereCondition,
    include: {
      provider: {
        select: {
          restaurantName: true,
          address: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};
