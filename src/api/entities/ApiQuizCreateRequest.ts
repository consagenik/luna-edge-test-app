export default interface ApiQuizCreateRequest {
  userId: number
  name: string
  description: string
  questionsQuantity: number
  time: number
}
