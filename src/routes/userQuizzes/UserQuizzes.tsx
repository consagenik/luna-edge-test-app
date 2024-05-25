import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import "./UserQuizzes.scss";

import {QuizMiddleware} from "../../state/quiz";
import {ApiQuiz} from "../../api/entities";

import {CreateIcon} from "../../assets/icons";

import {Loader, QuizListItem, Title, Text} from "../../components";

export default function UserQuizzes() {
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);

  useEffect(() => {
    QuizMiddleware.getUserQuizzes(1).then((res) => {
      setQuizzes(res);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [])

  return (
    <div className="allQuizzes">
      <Title text="My Quizzes" />

      <div className="toolPanel">
        <Text text={`Total: ${quizzes.length}`}/>

        <Link to="/quiz/create">
          <img src={CreateIcon} alt="Create" width={24} />
          <Text text="Create" />
        </Link>
      </div>

      {isLoading && <Loader />}

      {!isLoading && quizzes.length === 0 && <Text text="You don't have any quiz yet" />}

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
