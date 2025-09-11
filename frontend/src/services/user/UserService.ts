import type { User } from "../../models/User";
import { api } from "../../config/api";

async function login(email: string, password: string): Promise<User | null> {
  const user = await api.post("/login", { email, password });
  return user.data.token || null;
}

export const userService = {
  login,
};
