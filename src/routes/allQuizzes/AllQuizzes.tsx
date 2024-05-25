import {useEffect, useState} from "react";

import "./AllQuizzes.scss";

import {ApiQuiz} from "../../api/entities";
import {QuizMiddleware} from "../../state/quiz";

import {Loader, QuizListItem, Title} from "../../components";

export default function AllQuizzes() {
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);

  useEffect(() => {
    const quizzesRequest = QuizMiddleware.getAllQuizzes();
    const userResultsRequest = QuizMiddleware.getUserResults(1);

    Promise.all([quizzesRequest, userResultsRequest]).then((res) => {
      setQuizzes(res[0]);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [])

  return (
    <div className="allQuizzes">
      <Title text="All Quizzes" />

      {isLoading && <Loader />}

      <div className="quizzes">
        {quizzes.map(({id, name, description, questionsQuantity, time}) => (
          <QuizListItem
            key={id}
            id={id}
            name={name}
            description={description}
            questionsQuantity={questionsQuantity}
            time={time}
          />
        ))}
      </div>
    </div>
  );
}
