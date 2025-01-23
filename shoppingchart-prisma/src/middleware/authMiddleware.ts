import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "@patria2025";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = String(req.headers["authorization"]);
    if (!token) {
      res.status(401).json({ message: "Unauthorized!" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized!" });
      }
      next();
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { verifyToken };
