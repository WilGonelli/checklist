import { User } from "./User.js";

export interface IUser {
  findByEmailOrId(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  list(): Promise<User[]>;
}
