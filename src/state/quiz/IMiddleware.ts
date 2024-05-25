import {
  ApiEditQuestion,
  ApiQuestion,
  ApiQuiz,
  ApiQuizCreateRequest,
  ApiUserQuizAnswer,
  ApiUserQuizRequestAnswer,
  ApiUserQuizResult
} from "../../api/entities";

export default interface IMiddleware {
  getQuiz(id: number): Promise<ApiQuiz>;
  getAllQuizzes(): Promise<ApiQuiz[]>;
  getUserQuizzes(userId: number): Promise<ApiQuiz[]>;
  createQuiz(userId: number, quiz: ApiQuizCreateRequest): Promise<ApiQuiz>;
  updateQuiz(userId: number, id: number, quiz: ApiQuiz): Promise<ApiQuiz>;
  deleteQuiz(id: number): Promise<null>;
  getQuizQuestions(quizId: number): Promise<ApiQuestion[]>;
  editQuizQuestions(quizId: number, questions: ApiEditQuestion[]): Promise<ApiQuestion[]>;
  getUserResults(userId: number): Promise<ApiUserQuizResult[]>;
  getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult>;
  sendUserQuizAnswers(userId: number, quizId: number, answers: ApiUserQuizRequestAnswer[]): Promise<ApiUserQuizResult>;
  getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]>;
}
