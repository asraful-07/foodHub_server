import { ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const CreateProviderService = async (
  data: Omit<ProviderProfile, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.providerProfile.create({
    data,
  });
  return result;
};
