import type { IUser } from "../../domain/user/user.interface.js";
import { User } from "../../domain/user/User.js";
import sql from "../../config/db.postgres.js";

export class UserDBRepository implements IUser {
  async findByEmailOrId(value: string): Promise<User | null> {
    const rows =
      await sql`SELECT * FROM users WHERE user_email = ${value} OR user_id = ${
        Number(value) || -1
      }`;
    if (!rows.length) return null;
    const row = rows[0];
    return new User(
      row?.user_name,
      row?.user_email,
      row?.hash_password,
      row?.user_role,
      row?.id
    );
  }

  async create(user: User): Promise<void> {
    await sql`INSERT INTO users (user_name, user_email, hash_password, user_role)
              VALUES (${user.name}, ${user.email}, ${user.getHash()}, ${
      user.role
    })`;
  }

  async list(): Promise<User[]> {
    const rows = await sql`SELECT * FROM users`;
    return rows.map(
      (r) =>
        new User(r.user_name, r.user_email, r.hash_password, r.user_role, r.id)
    );
  }

  async update(user: User): Promise<void> {}
}
