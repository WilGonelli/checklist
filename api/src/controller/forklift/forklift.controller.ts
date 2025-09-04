import type { Request, Response } from "express";
import { ForkliftRepository } from "../../repository/forklift/forklift.repository.js";
import { ForkliftService } from "../../service/forklift/forklift.service.js";

const forkliftRepo = new ForkliftRepository();
const forkliftService = new ForkliftService(forkliftRepo);

export const listAllForklifts = async (req: Request, res: Response) => {
  try {
    const data = await forkliftService.findAll();
    res.json(data);
  } catch (err) {
    res.status(401).json({ err });
  }
};
