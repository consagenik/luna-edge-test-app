import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "./Quiz.scss"

import {QuizMiddleware} from "../../state/quiz";

import {Loader, Title} from "../../components";
import {QuizContent} from "./quizContent";

export default function Quiz() {
  const {id} = useParams();
  const idAsNumber = parseInt(id!);
  const idIsANumber = !isNaN(idAsNumber);

  const [isLoading, setIsLoading] = useState(true);
  const [quizExists, setQuizExists] = useState(false);

  useEffect(() => {
    if (idIsANumber) {
      QuizMiddleware
        .getQuiz(idAsNumber)
        .then((res) => setQuizExists(res.id !== undefined))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <div className="quiz">
      {isLoading && <Loader />}

      {!isLoading && quizExists && <QuizContent />}

      {!isLoading && !quizExists && <Title text="Quiz not found" />}
    </div>
  );
}
