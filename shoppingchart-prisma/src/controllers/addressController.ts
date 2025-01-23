import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const getAllAddress = async (req: Request, res: Response) => {
  try {
    const address = await prisma.addresses.findMany();
    res.status(201).json({ message: "Get data success", data: address });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving address" });
  }
};

const getAddressByID = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const address = await prisma.addresses.findFirst({ where: { AddressID: id } });
    res.status(201).json({ message: "Get data success", data: address });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving address" });
  }
};

const createAddress = async (req: Request, res: Response) => {
  try {
    const { CartID, AddressLine1, AddressLine2, City, State, ZipCode } = req.body;
    const checkCart = await prisma.carts.findFirst({ where: { CartID: CartID } });
    // If Cart Not Found
    if (!checkCart) {
      res.status(400).json({ message: "Cart not found" });
    }

    // Add Address Cart
    const addAddress = await prisma.addresses.create({
      data: { CartID, AddressLine1, AddressLine2, City, State, ZipCode },
    });
    res.status(201).json({ message: "Create address succesfully", data: addAddress });
  } catch (err) {
    res.status(500).json({ message: "Error create address" });
  }
};

const updateAddress = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const { CartID, AddressLine1, AddressLine2, City, State, ZipCode } = req.body;
    const addressUpdated = await prisma.addresses.update({
      where: { AddressID: id },
      data: { CartID, AddressLine1, AddressLine2, City, State, ZipCode },
    });

    const address = await prisma.addresses.findFirst({ where: { AddressID: id } });
    res.status(201).json({ message: "Update address succesfully", data: address });
  } catch (err) {
    res.status(500).json({ message: "Error updating address" });
  }
};

const deleteAddress = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const address = await prisma.addresses.delete({ where: { AddressID: id } });
    res.status(201).json({ message: "Delete address succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address" });
  }
};

export default { getAllAddress, getAddressByID, createAddress, updateAddress, deleteAddress };
