export default interface ApiUserQuizAnswer {
  id: number
  userId: number
  quizId: number
  questionId: number
  value: string | number
  isCorrect?: boolean
}
