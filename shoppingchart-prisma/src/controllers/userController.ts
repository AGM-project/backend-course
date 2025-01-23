import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";

const SECRET_KEY = "@patria2025";

const registerUser = async (req: Request, res: Response) => {
  const { Email, Password, Name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await prisma.users.create({ data: { Email: Email, Password: hashedPassword, Name: Name } });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { Email, Password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { Email: Email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user?.Password || "");
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user?.UserID }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "User loged in successfully", token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

export { registerUser, loginUser };
