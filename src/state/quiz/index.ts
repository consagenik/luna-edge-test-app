import Middleware from './Middleware';
import IMiddleware from './IMiddleware';

const quizMiddleware: IMiddleware = new Middleware();

export { quizMiddleware as QuizMiddleware };
