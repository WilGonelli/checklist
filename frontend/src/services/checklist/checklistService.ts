import type { ChecklistQuestions } from "../../models/ChecklistQuestions";
import type { ChecklistStatus } from "../../models/ChecklistStatus";
import { api } from "../../config/api";

async function getQuestions(token: string): Promise<ChecklistQuestions | null> {
  const question = await api.get("/question", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return question.data;
}

async function getAllStatus(
  token: string,
  id_forklift: number
): Promise<ChecklistStatus[] | null> {
  const checklistStatus = await api.get("/checklist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id_forklift: id_forklift,
    },
  });
  return checklistStatus.data;
}

async function getLastStatus(token: string): Promise<ChecklistStatus[] | null> {
  const checklistStatus = await api.get("/lastchecklist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checklistStatus.data;
}

export const checklistService = {
  getQuestions,
  getAllStatus,
  getLastStatus,
};
