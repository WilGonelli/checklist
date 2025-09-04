import { Forklift } from "../../domain/forklift/Forklift.js";
import type { IForklift } from "../../domain/forklift/forklift.interface.js";

export class ForkliftService {
  constructor(private reposotory: IForklift) {}

  findAll() {
    const rows = this.reposotory.listAll();
    return rows;
  }
}
