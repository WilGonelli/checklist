import { Questions } from "./Questions.js";

export interface IQuestions {
  findLastQuestions(): Promise<Questions | null>;
  createQuestions(questions: Questions): Promise<void>;
}
