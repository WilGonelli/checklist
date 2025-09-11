import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import sql from "../../config/db.postgres.js";
import type { IUser } from "../../types/user.js";
import { UserDBRepository } from "../../repository/user/userDB.repository.js";
import { UserService } from "../../service/user/user.service.js";

const userRepo = new UserDBRepository();
const userService = new UserService(userRepo);

const listAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await userService.list();
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password, bcrypt.compare);
    res.json({ token: token });
  } catch (err) {
    res.status(401).send((err as Error).message);
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, role }: IUser = req.body;
  try {
    const response = await userService.create(name, email, role);
    res.json(response);
  } catch (err) {
    res.json({ erro: err });
  }
};

export { listAllUsers, loginUser, createUser };
