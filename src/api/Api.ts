import IApi from './IApi';
import ApiQuiz from "./entities/ApiQuiz";
import ApiQuizCreateRequest from "./entities/ApiQuizCreateRequest";
import ApiQuestion from "./entities/ApiQuestion";
import ApiUserQuizResult from "./entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "./entities/ApiUserQuizAnswer";
import {quizQuestions, quizzes, userQuizAnswers, userQuizResults} from "./mockData";
import ApiEditQuestion from "./entities/ApiEditQuestion";
import ApiCreateQuestion from "./entities/ApiCreateQuestion";
import ApiCreateAnswer from "./entities/ApiCreateAnswer";
import ApiAnswer from "./entities/ApiAnswer";
import ApiUserQuizRequestAnswer from "./entities/ApiUserQuizRequestAnswer";

export default class Api implements IApi {
  private sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  public async getQuiz(id: number): Promise<ApiQuiz> {
    return this.sleep(300).then(() => quizzes.filter(quiz => quiz.id === id)[0]);
  }

  public async getAllQuizzes(): Promise<ApiQuiz[]> {
    return this.sleep(1000).then(() => quizzes);
  }

  public async getUserQuizzes(userId: number): Promise<ApiQuiz[]> {
    return this.sleep(1000).then(() => quizzes.filter(quiz => quiz.userId === userId));
  }

  public async createQuiz(data: ApiQuizCreateRequest): Promise<ApiQuiz> {
    const id = Math.floor(Math.random() * 10000) + 1;
    const quiz = {...data, id};

    return this.sleep(500).then(() => quiz);
  }

  public async updateQuiz(id: number, data: ApiQuiz): Promise<ApiQuiz> {
    return this.sleep(500).then(() => data);
  }

  public async deleteQuiz(id: number): Promise<null> {
    return this.sleep(200).then(() => null);
  }

  public async getQuizQuestions(quizId: number): Promise<ApiQuestion[]> {
    return this.sleep(1000).then(() => quizQuestions.filter(question => question.quizId === quizId));
  }

  public async editQuizQuestions(questions: ApiEditQuestion[]): Promise<ApiQuestion[]> {
    const resultQuestions: Promise<ApiQuestion>[] = questions.map(async (question) => {
      if (question.id) {
        return this.sleep(100).then(() => question as ApiQuestion);
      } else {
        const newQuestion = this.createQuizQuestion(question);

        if (question.answers) {
          question.answers.map(answer => this.createQuizQuestionAnswer(answer));
        }

        return newQuestion;
      }
    })

    return Promise.all(resultQuestions);
  }

  private async createQuizQuestion(question: ApiCreateQuestion): Promise<ApiQuestion> {
    const id = Math.floor(Math.random() * 10000) + 1;
    return this.sleep(50).then(() => ({...question, id}));
  }

  private async createQuizQuestionAnswer(answer: ApiCreateAnswer): Promise<ApiAnswer> {
    const id = Math.floor(Math.random() * 10000) + 1;
    return this.sleep(50).then(() => ({...answer, id}));
  }

  public async getUserResults(userId: number): Promise<ApiUserQuizResult[]> {
    return this.sleep(1000).then(() => userQuizResults);
  }

  public async getUserResult(userId: number, quizId: number): Promise<ApiUserQuizResult> {
    return this.sleep(1000).then(() => userQuizResults.filter((result) => result.userId === userId && result.quizId === quizId)[0]);
  }

  public async sendUserQuizAnswers(userId: number, quizId: number, answers: ApiUserQuizRequestAnswer[]): Promise<ApiUserQuizResult> {
    const id = Math.floor(Math.random() * 10000) + 1;
    const score = Math.floor(Math.random() * answers.length) + 1;

    const newResult: ApiUserQuizResult = {
      id,
      userId,
      quizId,
      score
    }

    return this.sleep(500).then(() => newResult);
  }

  public async getUserQuizAnswers(userId: number, quizId: number): Promise<ApiUserQuizAnswer[]> {
    return this.sleep(1000).then(() => userQuizAnswers);
  }
}
