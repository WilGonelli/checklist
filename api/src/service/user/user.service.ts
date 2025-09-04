import type { IUser } from "../../domain/user/user.interface.js";
import { User } from "../../domain/user/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
  constructor(private repository: IUser) {}

  private generateRandomPassword(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  async create(
    name: string,
    email: string,
    role: "superadmin" | "admin" | "user"
  ) {
    const password = this.generateRandomPassword();
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User(name, email, passwordHash, role);

    await this.repository.create(user);

    return user.toExport();
  }

  async list() {
    const users = await this.repository.list();
    return users.map((u) => u.toExport());
  }

  async login(
    email: string,
    password: string,
    compare: (p: string, h: string) => Promise<boolean>
  ) {
    const user = await this.repository.findByEmailOrId(email);
    if (!user) throw new Error("user not found");

    const valid = await user.validatePassword(password, compare);
    if (!valid) throw new Error("invalid password");

    const token = jwt.sign(
      { name: user.name, role: user.role },
      process.env.SECRET_KEY || "chave aleatoria",
      {
        expiresIn: "3h",
      }
    );

    return { token: token, user: user.toExport() };
  }
}
