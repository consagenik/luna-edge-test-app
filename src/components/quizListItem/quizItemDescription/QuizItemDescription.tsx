import './QuizItemDescription.scss';

import {Text} from "../../common/text";

interface QuizItemDescriptionProps {
  description: string
}

export default function QuizItemDescription({description}: QuizItemDescriptionProps) {
  return (
    <div className="quizItemDescription">
      <Text text={description}/>
    </div>
  );
}
