import { prisma } from "../../lib/prisma";

export const AddToCartService = async (
  customerId: string,
  mealId: string,
  quantity = 1,
) => {
  let cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_mealId: {
        cartId: cart.id,
        mealId,
      },
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      quantity,
    },
  });
};

export const GetMyCartService = async (customerId: string) => {
  return prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: {
            include: {
              category: true,
              provider: true,
            },
          },
        },
      },
    },
  });
};

export const RemoveCartItemService = async (
  customerId: string,
  cartItemId: string,
) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  return prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};

export const ClearCartService = async (customerId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  if (!cart) return null;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return { message: "Cart cleared" };
};
