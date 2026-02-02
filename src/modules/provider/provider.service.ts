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

export const GetsProviderService = async () => {
  const result = await prisma.providerProfile.findMany();
  return result;
};

export const GetProviderService = async (id: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};
