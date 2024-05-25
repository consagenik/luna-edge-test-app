import {ApiQuestion} from "../api/entities";

export type EditingQuestion = Omit<ApiQuestion, "id" | "quizId">;
