export interface User {
  name: string;
  email: string;
  role: "superadmin" | "admin" | "user";
  token: string;
}
