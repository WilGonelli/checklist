type avableStatus = "pass" | "fail";
type UserRole = "superadmin" | "admin" | "user";

export class Checklist {
  constructor(
    public forklift_id: number,
    public user_id: number,
    public checklist_status: avableStatus,
    public checklist_responses: Object,
    public user_name?: string,
    public user_email?: string,
    public user_role?: UserRole,
    public forklift_name?: string,
    public timestamp?: string,
    public id?: number
  ) {}

  toExport() {
    return {
      id: this.id,
      user_name: this.user_name,
      user_email: this.user_email,
      forklift_name: this.forklift_name,
      checklist_status: this.checklist_status,
      // checklist_responses: this.checklist_responses,
      created_at: new Date(
        this.timestamp ? parseInt(this.timestamp) : ""
      ).toLocaleString(),
    };
  }
}
