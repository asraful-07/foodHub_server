import { OrderStatus, User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const GetsUserService = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const GetUserService = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const UpdateUserService = async (id: string, data: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

export const StatsService = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      totalMeals,
      availableMeals,
      outOfStockMeals,
      totalOrders,
      placedOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,
      totalProviders,
      totalCustomers,
    ] = await Promise.all([
      tx.meal.count(),
      tx.meal.count({ where: { isAvailable: true } }),
      tx.meal.count({ where: { stock: 0 } }),
      tx.order.count(),
      tx.order.count({ where: { status: OrderStatus.PLACED } }),
      tx.order.count({ where: { status: OrderStatus.PREPARING } }),
      tx.order.count({ where: { status: OrderStatus.READY } }),
      tx.order.count({ where: { status: OrderStatus.DELIVERED } }),
      tx.order.count({ where: { status: OrderStatus.CANCELLED } }),
      tx.providerProfile.count(),
      tx.user.count({ where: { role: "CUSTOMER" } }),
    ]);

    return {
      totalMeals,
      availableMeals,
      outOfStockMeals,
      totalOrders,
      placedOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,
      totalProviders,
      totalCustomers,
    };
  });
};
