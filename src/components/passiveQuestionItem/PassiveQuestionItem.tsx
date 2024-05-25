import "./PassiveQuestionItem.scss";

import {EditingQuestion} from "../../entities";
import {ApiQuestionType} from "../../api/entities";

import {CheckboxIcon, RadioButtonIcon, TextIcon} from "../../assets/icons";

import {Text} from "../common/text";
import {Button} from "../common/button";

interface PassiveQuestionItemProps {
  editing: boolean
  question: EditingQuestion
  onClickEdit: () => void
  onClickDelete: () => void
  disabledButtons?: boolean
}

function getQuestionTypeIcon(type: ApiQuestionType) {
  let icon;

  switch (type) {
    case 'text':
      icon = TextIcon;
      break;
    case 'selectOne':
      icon =  RadioButtonIcon;
      break;
    case 'selectMany':
      icon =  CheckboxIcon;
      break;
  }

  return icon;
}

export default function PassiveQuestionItem({editing, question, onClickEdit, onClickDelete, disabledButtons}: PassiveQuestionItemProps) {
  return (
    <div className={editing ? "passiveQuestionItem editing" : "passiveQuestionItem"}>
      <div className="info">
        <img src={getQuestionTypeIcon(question.type)} alt={question.type} width={24} />
        <Text text={question.name}/>
      </div>

      <div className="actionButtons">
        <Button text="Edit" onClick={onClickEdit} disabled={disabledButtons} />
        <Button variant="secondary" text="Delete" onClick={onClickDelete} disabled={disabledButtons} />
      </div>
    </div>
  );
}
