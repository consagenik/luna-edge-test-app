import {useMemo} from "react";

import "./QuizListItem.scss";

import {ApiUserQuizResult} from "../../api/entities";

import {QuizItemHeader} from "./quizItemHeader";
import {QuizItemAdditionalInfo} from "./quizItemAdditionalInfo";
import {QuizItemDescription} from "./quizItemDescription";

interface QuizListItemProps {
  id: number
  name: string
  description: string
  questionsQuantity: number
  time: number
}

export default function QuizListItem({id, name, description, questionsQuantity, time}: QuizListItemProps) {
  const actualResult = useMemo(() => {
    const userResults: ApiUserQuizResult[] = localStorage.getItem('user_results_1') ? JSON.parse(localStorage.getItem('user_results_1') as string) : [];
    return userResults.find(result => result.quizId === id);
  }, [id])

  return (
    <div className="quizListItem">
      <QuizItemHeader quizId={id} name={name} score={actualResult?.score} />
      <QuizItemAdditionalInfo questionsQuantity={questionsQuantity} time={time} />
      <QuizItemDescription description={description} />
    </div>
  );
}
