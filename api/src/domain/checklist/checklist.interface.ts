import { Checklist } from "./Checklist.js";

export interface IChecklist {
  getAllChecklis(): Promise<Checklist[]>;
  postChecklist(checklist: Checklist): Promise<void>;
}
