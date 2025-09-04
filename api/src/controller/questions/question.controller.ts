import type { Request, Response } from "express";
import { QuestionService } from "../../service/questions/questions.service.js";
import { questionsDBRepository } from "../../repository/questions/questions.repository.js";

const questionRepo = new questionsDBRepository();
const questionService = new QuestionService(questionRepo);

const findLastQuastion = async (req: Request, res: Response) => {
  try {
    const data = await questionService.find();
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

const createQuestion = async (req: Request, res: Response) => {
  const { id_user, questions } = req.body;
  try {
    const data = await questionService.create(questions, id_user);
    res.json(data);
  } catch (err) {
    res.json({ erro: err });
  }
};

export { findLastQuastion, createQuestion };
