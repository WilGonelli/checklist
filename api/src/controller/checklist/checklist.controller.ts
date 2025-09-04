import type { Request, Response } from "express";
import { ChecklistRepository } from "../../repository/checklist/checklist.repository.js";
import { ChecklistService } from "../../service/checklist/checklist.service.js";

const checklistRepo = new ChecklistRepository();
const checklistService = new ChecklistService(checklistRepo);

export const postChecklistStatus = async (req: Request, res: Response) => {
  const { id_forklift, id_user, checklist_status, checklist_responses } =
    req.body;

  try {
    const response = await checklistService.create(
      id_forklift,
      id_user,
      checklist_status,
      checklist_responses
    );

    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({ erro: err });
  }
};

export const getChecklistStatus = async (req: Request, res: Response) => {
  try {
    const data = await checklistService.findAll();
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};
