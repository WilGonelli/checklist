import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { IUser } from "../types/user.js";
import type { NextFunction, Request, Response } from "express";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "chave aleatoria";

const authUser = async (password: string, user: IUser) => {
  console.log(user);

  const checkPassword = await bcrypt.compare(password, user.hash_password);

  if (!checkPassword) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign({ name: user.name, role: user.role }, SECRET_KEY, {
    expiresIn: "3h",
  });

  return token;
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
};

export { authUser, verifyToken };
