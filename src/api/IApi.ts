import ApiQuiz from "./entities/ApiQuiz";
import ApiUserQuizResult from "./entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "./entities/ApiUserQuizAnswer";
import ApiQuizCreateRequest from "./entities/ApiQuizCreateRequest";
import ApiQuestion from "./entities/ApiQuestion";
import ApiEditQuestion from "./entities/ApiEditQuestion";
import ApiUserQuizRequestAnswer from "./entities/ApiUserQuizRequestAnswer";

export default interface IApi {
  getQuiz(id: number): Promise<ApiQuiz>;
  getAllQuizzes(): Promise<ApiQuiz[]>;
  getUserQuizzes(userId: number): Promise<ApiQuiz[]>;
  createQuiz(quiz: ApiQuizCreateRequest): Promise<ApiQuiz>;
  updateQuiz(id: number, quiz: ApiQuiz): Promise<ApiQuiz>;
  deleteQuiz(id: number): Promise<null>;
  getQuizQuestions(quizId: number): Promise<ApiQuestion[]>;
  editQuizQuestions(questions: ApiEditQuestion[]): Promise<ApiQuestion[]>;
  getUserResults(userId: number): Promise<ApiUserQuizResult[]>;
  getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult>;
  sendUserQuizAnswers(userId: number, quizId: number, answers: ApiUserQuizRequestAnswer[]): Promise<ApiUserQuizResult>
  getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]>;
}
