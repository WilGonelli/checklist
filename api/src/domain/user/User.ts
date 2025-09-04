type UserRole = "superadmin" | "admin" | "user";

export class User {
  constructor(
    public name: string,
    public email: string,
    private passwordHash: string,
    public role: UserRole,
    public readonly id?: number
  ) {}

  async validatePassword(
    password: string,
    compare: (password: string, hash: string) => Promise<boolean>
  ) {
    return await compare(password, this.passwordHash);
  }

  toExport() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
  getHash() {
    return this.passwordHash;
  }
}
