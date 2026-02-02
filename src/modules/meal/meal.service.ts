import { DietaryPreference, Meal, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const CreateMealService = async (
  data: Omit<Meal, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.meal.create({
    data,
  });
  return result;
};

interface GetMealsParams {
  search: string | undefined;
  dietaryPreference: DietaryPreference | undefined;
  cuisine: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  isAvailable: boolean | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export const GetsMealsService = async (params: GetMealsParams) => {
  const {
    search,
    dietaryPreference,
    cuisine,
    isAvailable,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  } = params;

  const andConditions: Prisma.MealWhereInput[] = [];

  if (search) {
    andConditions.push({
      name: {
        contains: search,
        mode: "insensitive",
      },
    });
  }

  if (dietaryPreference) {
    andConditions.push({
      dietaryPreferences: dietaryPreference,
    });
  }

  if (cuisine) {
    andConditions.push({
      category: {
        name: {
          equals: cuisine,
          mode: "insensitive",
        },
      },
    });
  }

  if (isAvailable !== undefined) {
    andConditions.push({ isAvailable });
  }

  const whereCondition: Prisma.MealWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.meal.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder === "asc" ? "asc" : "desc",
    } as Prisma.MealOrderByWithRelationInput,
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

  const total = await prisma.meal.count({
    where: whereCondition,
  });

  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
  };
};

export const GetsProviderMenuService = async (
  isAdmin: boolean,
  userId: string,
) => {
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

export const GetMealsService = async (id: string) => {
  const result = await prisma.meal.findUnique({
    where: {
      id: id,
    },
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

interface UpdateMealInput {
  name?: string;
  description?: string;
  price?: number;
  image?: string[];
  stock?: number;
  isAvailable?: boolean;
  dietaryPreferences?: DietaryPreference;
  categoryId?: string;
}

export const UpdateMealsService = async (id: string, data: UpdateMealInput) => {
  const result = await prisma.meal.update({
    where: { id },
    data: data,
  });

  return result;
};

export const DeleteMealsService = async (id: string) => {
  const result = await prisma.meal.delete({
    where: {
      id: id,
    },
  });

  return result;
};
