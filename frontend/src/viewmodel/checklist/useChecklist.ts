import { useEffect, useState } from "react";
import type { User } from "../../models/User";
import type { Forklift } from "../../models/Forklift";
import { forkliftService } from "../../services/forklift/forkliftService";
import { checklistService } from "../../services/checklist/checklistService";
import type { ChecklistStatus } from "../../models/ChecklistStatus";

export function useChecklist(id_forklift?: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>("");
  const [open, setOpen] = useState<boolean>(false);
  const [forklifts, setForklifts] = useState<Forklift[] | null>(null);
  const [checklistsStatus, setcheCklistsStatus] = useState<
    ChecklistStatus[] | null
  >(null);

  const onChecklistRender = async () => {
    try {
      const dataUser = sessionStorage.getItem("user");
      if (!dataUser) throw new Error("cannot found user info");

      const dataForklift = await forkliftService.getAllForklifts(
        JSON.parse(dataUser).token
      );
      const dataChecklists = await checklistService.getLastStatus(
        JSON.parse(dataUser).token
      );

      if (id_forklift) {
        const dataChecklistsbyid = await checklistService.getAllStatus(
          JSON.parse(dataUser).token,
          id_forklift
        );
      }

      setcheCklistsStatus(dataChecklists);
      setForklifts(dataForklift);
      setUser(JSON.parse(dataUser).user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onChecklistRender();
  }, []);

  return {
    user,
    loading,
    forklifts,
    selected,
    setSelected,
    open,
    setOpen,
    checklistsStatus,
  };
}
