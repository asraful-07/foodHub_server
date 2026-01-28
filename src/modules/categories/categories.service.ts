import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const CrateCategoriesService = async (
  data: Omit<Category, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

export const GetsCategoriesService = async () => {
  const result = await prisma.category.findMany();
  return result;
};
