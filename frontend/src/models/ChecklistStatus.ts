export interface ChecklistStatus {
  id: number;
  checklist_status: "pass" | "fail";
  user_name: string;
  forklift_id: number;
  forklift_name: string;
  created_at: string;
}
