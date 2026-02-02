import { Review } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const CreateReviewServices = async (
  data: Omit<Review, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.review.create({
    data,
  });
  return result;
};

export const GetsReviewServices = async () => {
  const result = await prisma.review.findMany();
  return result;
};
