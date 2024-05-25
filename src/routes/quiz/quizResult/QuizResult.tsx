import {useNavigate} from "react-router-dom";

import "./QuizResult.scss";

import {RoutePath} from "../../routeConfig";

import {Button, Text, Title} from "../../../components";

interface QuizResultProps {
  score: number
  maxScore: number
}

export default function QuizResult({score, maxScore}: QuizResultProps) {
  const navigate = useNavigate();

  return (
    <div className="quizResult">
      <div className="quizResultWrapper">
        <Title text="Quiz result" level={3}/>

        <Text text={`${score} / ${maxScore}`} centered/>
      </div>

      <div className="actionButtons">
        <Button
          variant="primary"
          text="Back to all quizzes"
          onClick={() => navigate(RoutePath.quizzesList)}
        />
      </div>
    </div>
  );
}
