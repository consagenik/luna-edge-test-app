import IMiddleware from "./IMiddleware";
import {Api} from "../../api";
import {
  ApiEditQuestion,
  ApiQuestion,
  ApiQuiz,
  ApiQuizCreateRequest,
  ApiUserQuizAnswer,
  ApiUserQuizRequestAnswer,
  ApiUserQuizResult
} from "../../api/entities";

export default class Middleware implements IMiddleware {
  public async getQuiz(id: number): Promise<ApiQuiz> {
    const data = localStorage.getItem('quiz_' + id);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getQuiz(id);

    localStorage.setItem('quiz_' + id, JSON.stringify(response));

    return response;
  }

  public async getAllQuizzes(): Promise<ApiQuiz[]> {
    const data = localStorage.getItem('quizzes');

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getAllQuizzes();
    localStorage.setItem('quizzes', JSON.stringify(response));

    return response;
  }

  public async getUserQuizzes(userId: number): Promise<ApiQuiz[]> {
    const data = localStorage.getItem('user_quizzes_' + userId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getUserQuizzes(userId);
    localStorage.setItem('user_quizzes_' + userId, JSON.stringify(response));

    return response;
  }

  public async createQuiz(userId: number, quiz: ApiQuizCreateRequest): Promise<ApiQuiz> {
    const response = await Api.createQuiz(quiz);
    const quizzes = await this.getAllQuizzes();
    const userQuizzes = await this.getUserQuizzes(userId);

    const updatedAllQuizzesList = [...quizzes, response];
    const updatedUserQuizzesList = [...userQuizzes, response];

    localStorage.setItem('quizzes', JSON.stringify(updatedAllQuizzesList));
    localStorage.setItem('user_quizzes_' + userId, JSON.stringify(updatedUserQuizzesList));

    return response;
  }

  public async updateQuiz(userId: number, id: number, quiz: ApiQuiz): Promise<ApiQuiz> {
    const response = await Api.updateQuiz(id, quiz);
    const quizzes = await this.getAllQuizzes();
    const userQuizzes = await this.getUserQuizzes(userId);

    const updateQuizIndex = quizzes.findIndex((quiz) => quiz.id === id);
    const updateUserQuizIndex = userQuizzes.findIndex((quiz) => quiz.id === id);

    quizzes.splice(updateQuizIndex, 1, response);
    userQuizzes.splice(updateUserQuizIndex, 1, response);

    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    localStorage.setItem('user_quizzes_' + userId, JSON.stringify(userQuizzes));

    return response;
  }

  public async deleteQuiz(id: number): Promise<null>  {
    const response = await Api.deleteQuiz(id);
    const quizzes = await this.getAllQuizzes();
    localStorage.setItem('quizzes', JSON.stringify(quizzes.filter((quiz) => quiz.id !== id)));
    return response;
  }

  public async getQuizQuestions(quizId: number): Promise<ApiQuestion[]> {
    const data = localStorage.getItem('quiz_questions_' + quizId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getQuizQuestions(quizId);
    localStorage.setItem('quiz_questions_' + quizId, JSON.stringify(response));

    return response;
  }

  public async editQuizQuestions(quizId: number, questions: ApiEditQuestion[]): Promise<ApiQuestion[]> {
    const response = await Api.editQuizQuestions(questions);
    localStorage.setItem('quiz_questions_' + quizId, JSON.stringify(response));

    return response;
  }

  public async getUserResults(userId: number): Promise<ApiUserQuizResult[]> {
    const data = localStorage.getItem('user_results_' + userId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getUserResults(userId);
    localStorage.setItem('user_results_' + userId, JSON.stringify(response));

    return response;
  }

  public async getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult> {
    return this.getUserResults(userId).then((results) => results.filter((result) => result.quizId === quizId)[0]);
  }

  public async sendUserQuizAnswers(userId: number, quizId: number, answers: ApiUserQuizRequestAnswer[]): Promise<ApiUserQuizResult> {
    const response = await Api.sendUserQuizAnswers(userId, quizId, answers);
    const results = await this.getUserResults(userId);
    localStorage.setItem('user_results_' + userId, JSON.stringify([...results, response]));
    return response;
  }

  public async getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]> {
    const data = localStorage.getItem('user_answers_' + userId + '_' + quizId);

    if (data) {
      return JSON.parse(data);
    }

    const response = await Api.getUserQuizAnswers(userId, quizId);
    localStorage.setItem('user_answers_' + userId + '_' + quizId, JSON.stringify(response));

    return response;
  }
}
