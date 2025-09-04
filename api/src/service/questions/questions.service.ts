import { Questions } from "../../domain/questions/Questions.js";
import type { IQuestions } from "../../domain/questions/questions.interface.js";

export class QuestionService {
  constructor(private repository: IQuestions) {}

  async create(questions: Object, user_id: number) {
    const question = new Questions(questions, user_id);
    await this.repository.createQuestions(question);
    return question;
  }

  async find() {
    const question = await this.repository.findLastQuestions();
    return question;
  }
}
