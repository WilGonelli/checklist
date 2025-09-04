import type { IForklift } from "../../domain/forklift/forklift.interface.js";
import { Forklift } from "../../domain/forklift/Forklift.js";
import sql from "../../config/db.postgres.js";

export class ForkliftRepository implements IForklift {
  async listAll(): Promise<Forklift[]> {
    const rows = await sql`SELECT * FROM forklifts`;
    return rows.map((f) => new Forklift(f.forklift_name, f.device_nem, f.id));
  }
}
