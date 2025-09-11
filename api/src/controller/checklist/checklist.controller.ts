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
    res.json({ erro: err });
  }
};

export const getChecklistStatus = async (req: Request, res: Response) => {
  const { id_forklift } = req.query;
  try {
    const data = await checklistService.findAllById(Number(id_forklift));
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

export const getLastChecklist = async (req: Request, res: Response) => {
  try {
    const data = await checklistService.findLasts();
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};
