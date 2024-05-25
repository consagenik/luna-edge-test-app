export default interface ApiUserQuizRequestAnswer {
  userId: number
  quizId: number
  questionId: number
  value: string | number | number[] | undefined
}
