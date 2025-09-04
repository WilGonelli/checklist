import { Checklist } from "../../domain/checklist/Checklist.js";
import type { IChecklist } from "../../domain/checklist/checklist.interface.js";
import sql from "../../config/db.postgres.js";

export class ChecklistRepository implements IChecklist {
  async getAllChecklis(): Promise<Checklist[]> {
    const rows = await sql`SELECT 
                          c.id as checklist_id,
                          c.checklist_status,
                          c.checklist_responses,
                          c.timestamp_ms,
                          u.user_name,
                          u.user_email,
                          u.user_role,
                          f.*
                        FROM checklist c
                        JOIN users u ON c.id_user = u.user_id
                        JOIN forklifts f ON c.id_forklift = f.id;`;

    return rows.map(
      (r) =>
        new Checklist(
          r.id_forklift,
          r.id_user,
          r.checklist_status,
          r.checklist_responses,
          r.user_name,
          r.user_email,
          r.user_role,
          r.forklift_name,
          r.timestamp_ms,
          r.checklist_id
        )
    );
  }

  async postChecklist(checklist: Checklist): Promise<void> {
    await sql`INSERT INTO checklist(id_forklift, id_user, checklist_status, checklist_responses)
            VALUES(${checklist.forklift_id}, 
            ${checklist.user_id}, 
            ${checklist.checklist_status}, 
            ${JSON.parse(
              JSON.stringify(checklist.checklist_responses)
            )}::jsonb)`;
  }
}
