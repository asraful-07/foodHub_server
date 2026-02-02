import { Order, OrderStatus } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/authMiddleware";

export type CreateOrderPayload = {
  customerId: string;
  providerId: string;
  deliveryAddress: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
};

export const CreateOrderService = async (payload: CreateOrderPayload) => {
  const { customerId, providerId, deliveryAddress, items } = payload;

  if (!items || items.length === 0) {
    throw new Error("Order items are required");
  }

  return await prisma.$transaction(async (tx) => {
    let totalPrice = 0;

    for (const item of items) {
      const meal = await tx.meal.findUniqueOrThrow({
        where: { id: item.mealId },
      });

      if (!meal.isAvailable) {
        throw new Error(`${meal.name} is not available`);
      }

      if (meal.stock < item.quantity) {
        throw new Error(`${meal.name} stock not sufficient`);
      }

      totalPrice += meal.price * item.quantity;
    }

    const order = await tx.order.create({
      data: {
        customerId,
        providerId,
        deliveryAddress,
        totalPrice,
      },
    });

    for (const item of items) {
      const meal = await tx.meal.findUniqueOrThrow({
        where: { id: item.mealId },
      });

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          mealId: meal.id,
          quantity: item.quantity,
          price: meal.price,
        },
      });

      await tx.meal.update({
        where: { id: meal.id },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    const cart = await tx.cart.findUnique({
      where: { customerId },
    });

    if (cart) {
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return order;
  });
};

export const GetsOrderService = async (userId: string, role: UserRole) => {
  let whereCondition: any = {};

  if (role === UserRole.CUSTOMER) {
    whereCondition.customerId = userId;
  }

  if (role === UserRole.PROVIDER) {
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!providerProfile) return [];

    whereCondition.providerId = providerProfile.id;
  }

  const result = await prisma.order.findMany({
    where: whereCondition,
    include: {
      provider: {
        select: {
          restaurantName: true,
        },
      },
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        select: {
          quantity: true,
          meal: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const GetOrderService = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const UpdateOrderService = async (
  id: string,
  newStatus: OrderStatus,
  user: { id: string; role: UserRole },
) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { provider: true },
  });

  if (!order) throw new Error("Order not found");

  if (user.role === UserRole.ADMIN) {
    return await prisma.order.update({
      where: { id },
      data: { status: newStatus },
    });
  }

  if (user.role === UserRole.PROVIDER) {
    if (order.provider.userId !== user.id) {
      throw new Error("You can only update your own restaurant orders");
    }
    return await prisma.order.update({
      where: { id },
      data: { status: newStatus },
    });
  }

  if (user.role === UserRole.CUSTOMER) {
    if (newStatus !== OrderStatus.CANCELLED) {
      throw new Error("Customers can only cancel orders");
    }

    return await prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED },
    });
  }

  throw new Error("Unauthorized to update this order");
};
