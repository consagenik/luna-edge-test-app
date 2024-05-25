import ApiAnswer from "./ApiAnswer";
import {ApiQuestionType} from "./ApiQuestionType";

export default interface ApiEditQuestion {
  id?: number
  quizId: number
  name: string
  type: ApiQuestionType
  time: number
  answers?: ApiAnswer[]
}
