import './QuizItemAdditionalInfo.scss';

import {Text} from "../../common/text";

interface QuizItemAdditionalInfoProps {
  questionsQuantity: number
  time: number
}

export default function QuizItemAdditionalInfo({questionsQuantity, time}: QuizItemAdditionalInfoProps) {
  return (
    <div className="quizItemAdditionalInfo">
      <Text text={`Questions: ${questionsQuantity}`}/>
      <Text text={`Time: ${time} min`}/>
    </div>
  );
}
