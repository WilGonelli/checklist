import { Checklist } from "../../domain/checklist/Checklist.js";
import type { IChecklist } from "../../domain/checklist/checklist.interface.js";

export class ChecklistService {
  constructor(private repository: IChecklist) {}

  async create(
    id_forklift: number,
    id_user: number,
    checklist_status: "pass" | "fail",
    checklist_responses: Object
  ) {
    const checklist = new Checklist(
      id_forklift,
      id_user,
      checklist_status,
      checklist_responses
    );

    await this.repository.postChecklist(checklist);
  }

  async findAll() {
    const rows = await this.repository.getAllChecklis();

    return rows?.map((c) => c.toExport());
  }
}
