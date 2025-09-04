import { Questions } from "../../domain/questions/Questions.js";
import type { IQuestions } from "../../domain/questions/questions.interface.js";
import sql from "../../config/db.postgres.js";

export class questionsDBRepository implements IQuestions {
  async createQuestions(questions: Questions): Promise<void> {
    await sql`INSERT INTO questions (id_user, checklist_questions)
              VALUES (${questions.user_id}, ${JSON.stringify(
      questions.questions
    )}::jsonb)`;
  }

  async findLastQuestions(): Promise<Questions | null> {
    const row = await sql`SELECT * FROM questions ORDER BY id DESC LIMIT 1`;
    if (!row.length) return null;
    const data = row[0];
    return new Questions(
      data?.checklist_questions,
      data?.id_user,
      data?.timestamp,
      data?.id
    );
  }
}
