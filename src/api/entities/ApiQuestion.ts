import ApiAnswer from "./ApiAnswer";
import {ApiQuestionType} from "./ApiQuestionType";

export default interface ApiQuestion {
  id: number
  quizId: number
  name: string
  type: ApiQuestionType
  time: number
  answers?: ApiAnswer[]
}
