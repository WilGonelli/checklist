import type { Forklift } from "../../models/Forklift";
import { api } from "../../config/api";

async function getAllForklifts(token: string): Promise<Forklift[] | null> {
  const checklistStatus = await api.get("/forklift", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checklistStatus.data;
}

export const forkliftService = {
  getAllForklifts,
};
