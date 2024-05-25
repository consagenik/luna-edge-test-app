import ApiAnswer from "./ApiAnswer";
import {ApiQuestionType} from "./ApiQuestionType";

export default interface ApiCreateQuestion {
  quizId: number
  name: string
  type: ApiQuestionType
  time: number
  answers?: ApiAnswer[]
}
