import { Forklift } from "./Forklift.js";

export interface IForklift {
  listAll(): Promise<Forklift[]>;
}
