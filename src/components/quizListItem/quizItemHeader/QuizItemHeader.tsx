import {Link} from "react-router-dom";

import './QuizItemHeader.scss';

import {CompletedIcon, EditIcon, LinkIcon} from "../../../assets/icons";

import {Title} from "../../common/title";
import {Text} from "../../common/text";

interface QuizItemHeaderProps {
  quizId: number
  name: string
  score: number | undefined
}

export default function QuizItemHeader({quizId, name, score}: QuizItemHeaderProps) {
  const {pathname} = window.location;

  const editable = pathname === "/myQuizzes";

  return (
    <div className="quizItemHeader">
      <div className="titleWrapper">
        {!editable && score !== undefined && <img src={CompletedIcon} alt="Completed" width={24} />}

        <Link to={`/quiz/${quizId}`} className="link">
          <Title text={name} level={2}/>
          <img src={LinkIcon} alt="Open" width={24} />
        </Link>
      </div>

      {!editable && score !== undefined && (
        <span className="score">
          Score: <span className="scoreValue">{score}</span>
        </span>
      )}

      {editable && (
        <Link to={`/quiz/${quizId}/edit`} className="editLink">
          <img src={EditIcon} alt="Edit" width={24} />
          <Text text="Edit" />
        </Link>
      )}
    </div>
  );
}
