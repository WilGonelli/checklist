import { Checklist } from "./Checklist.js";

export interface IChecklist {
  getAllChecklis(id_forklift: number): Promise<Checklist[]>;
  getLastChecklists(): Promise<Checklist[]>;
  postChecklist(checklist: Checklist): Promise<void>;
}
