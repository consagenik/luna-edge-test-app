import {InputField} from "../form/inputField";

import "./QuizQuestionAnswerVariant.scss";

import {RemoveIcon} from "../../assets/icons";

import {CheckboxField} from "../form/checkboxField";

interface QuizQuestionAnswerVariantProps {
  questionIndex: number
  answerIndex: number
  value: string
  isRight: boolean
  onChange: (name: string, value: any) => void
  onDelete: () => void
}

export default function QuizQuestionAnswerVariant({value, isRight, onChange, onDelete, questionIndex, answerIndex}: QuizQuestionAnswerVariantProps) {
  return (
    <div className="quizQuestionAnswerVariant">
      <button type="button" className="removeAnswer" onClick={onDelete}>
        <img src={RemoveIcon} alt="Remove"/>
      </button>

      <InputField
        type="text"
        name="text"
        label="Answer"
        placeholder="Write variant of answer"
        value={value}
        onChange={onChange}
      />

      <CheckboxField
        id={`question[${questionIndex}].answers[${answerIndex}].isRight`}
        label="Is right"
        name="isRight"
        value={isRight}
        onChange={onChange}
      />
    </div>
  );
}
