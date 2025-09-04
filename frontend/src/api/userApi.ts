import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const ApiUser = {
  async login(email: unknown, password: unknown): Promise<unknown> {
    const user = await api.post("/login", { email, password });
    if (!user.data.token) return;
    const token = user.data.token.token;

    console.log(token);
    return user;
  },
};
