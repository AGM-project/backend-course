import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    res.status(201).json({ message: "Get data success", data: products });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

const getProductByID = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const products = await prisma.products.findFirst({ where: { ProductID: id } });
    res.status(201).json({ message: "Get data success", data: products });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { Name, Description, Price, Stock } = req.body;
    const product = await prisma.products.create({ data: { Name, Description, Price, Stock } });
    res.status(201).json({ message: "Add product succesfully", data: product });
  } catch {
    res.status(500).json({ message: "Error creating product" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const { Name, Description, Price, Stock } = req.body;
    const productUpdated = await prisma.products.update({
      where: { ProductID: id },
      data: { Name, Description, Price, Stock },
    });

    const products = await prisma.products.findFirst({ where: { ProductID: id } });
    res.status(201).json({ message: "Update product succesfully", data: products });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const cartItems = await prisma.cartItems.findFirst({ where: { ProductID: id } });
    if (cartItems) {
      res.status(400).json({ message: "Product is in cart, cannot delete" });
    }
    const productDeleted = await prisma.products.delete({ where: { ProductID: id } });
    res.status(201).json({ message: "Delete product succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export default { getAllProducts, createProduct, getProductByID, updateProduct, deleteProduct };
