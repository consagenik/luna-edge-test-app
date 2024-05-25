import "./QuizInfo.scss";

import {Text, Title} from "../../../components";

interface QuizInfoProps {
  name: string;
  description: string;
}

export default function QuizInfo({name, description}: QuizInfoProps) {
  return (
    <div className="quizInfo">
      <Title centered={false} text={name} />
      <Text text={description} />
    </div>
  );
}
