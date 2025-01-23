import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await prisma.carts.findMany({
      include: { CartItems: { include: { Products: true } }, Orders: true },
    });
    res.status(201).json({ message: "Get data success", data: carts });
  } catch (err) {
    res.status(500).json({ message: "Error retrieve carts" });
  }
};

const getCartByID = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const carts = await prisma.carts.findFirst({
      include: {
        CartItems: {
          include: { Products: true },
        },
        Orders: true,
      },
      where: {
        CartID: id,
      },
    });
    res.status(201).json({ message: "Get data success", data: carts });
  } catch (err) {
    res.status(500).json({ message: "Error retrieve carts" });
  }
};

const createCart = async (req: Request, res: Response) => {
  try {
    const newCart = await prisma.carts.create({
      data: {},
    });
    res.status(201).json({ message: "Cart created successfully", data: newCart });
  } catch (err) {
    res.status(500).json({ message: "Error create cart" });
  }
};

const deleteCart = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const deleteCart = await prisma.carts.delete({
      where: {
        CartID: id,
      },
    });
    res.status(201).json({ message: "Delete cart successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error create cart" });
  }
};

export { getAllCarts, getCartByID, createCart, deleteCart };
