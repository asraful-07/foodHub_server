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

export const GetCategoriesService = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const UpdateCategoriesService = async (
  id: string,
  data: Partial<Category>,
) => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

export const DeleteCategoriesService = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};
