import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import sql from "../config/db.postgres.js";
import type { IUser } from "../types/user.js";
import { authUser } from "../service/auth.user.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data =
      await sql`SELECT user_name, user_email, user_role  FROM users;`;
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: (IUser | undefined)[] =
      await sql`SELECT * FROM users WHERE user_email = ${email}`;

    if (user.length <= 0) {
      res.json({ erro: "usuario não cadastrado" });
    }
    if (user[0]) {
      const response = await authUser(password, user[0]);
      res.json({ user: user[0], token: response });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role }: IUser = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const response =
      await sql`INSERT INTO public.users (user_name, user_email, hash_password, user_role)
      VALUES (
      ${name}, 
      ${email}, 
      ${hashPassword}, 
      ${role});`;

    res.json(response);
  } catch (err) {
    res.json({ erro: err });
  }
};

const getQuestions = async (req: Request, res: Response) => {
  try {
    const data = await sql`SELECT * FROM questions;`;
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

const postQuestions = async (req: Request, res: Response) => {
  const { id_user, questions } = req.body;
  try {
    const data = await sql`INSERT INTO questions (id_user, checklist_questions)
  VALUES (
      ${id_user},  
      ${questions}
      ::JSONB
  );`;
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

const postChecklistStatus = async (req: Request, res: Response) => {
  const { id_forklift, id_user, checklist_status, checklist_responses } =
    req.body;

  try {
    const response =
      await sql`INSERT INTO checklist (id_forklift, id_user, checklist_status, checklist_responses)
      VALUES (
        ${id_forklift},
        ${id_user},
        ${checklist_status}, 
        ${checklist_responses}::JSONB
    );`;

    res.json(response);
  } catch (err) {
    res.json({ erro: err });
  }
};

const getChecklistStatus = async (req: Request, res: Response) => {
  try {
    const data = await sql`SELECT * FROM checklist;`;
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

export {
  getAllUsers,
  getUserByEmail,
  getQuestions,
  postQuestions,
  postChecklistStatus,
  getChecklistStatus,
  createUser,
};
