export class Questions {
  constructor(
    public questions: Object,
    public user_id: number,
    public created_at?: Date,
    public readonly id?: number
  ) {}
}
