import {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {Form, Formik, FormikProps} from "formik";

import "./QuizContent.scss";

import {ApiQuestion, ApiQuiz, ApiUserQuizRequestAnswer, ApiUserQuizResult} from "../../../api/entities";
import {QuizMiddleware} from "../../../state/quiz";

import {Button, InputField, RadioFieldsGroup, SubmitButton, Text, Title} from "../../../components";
import {CheckboxFieldsGroup} from "../../../components/form/checkboxFieldsGroup";
import {QuizInfo} from "../quizInfo";
import {QuizResult} from "../quizResult";

interface IForm {
  answers: ApiUserQuizRequestAnswer[]
}

function getAnswerDefaultValue(question: ApiQuestion) {
  switch (question.type) {
    case "text":
      return "";
    case "selectOne":
      return question.answers?.[0].id;
    case "selectMany":
      return [];
  }
}

export default function QuizContent() {
  const {id} = useParams();
  const idAsNumber = parseInt(id!);

  const [initialValues, setInitialValues] = useState<IForm>({answers: []});
  const [showQuizInfo, setShowQuizInfo] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<ApiUserQuizResult>();

  const quizRef = useRef<ApiQuiz>();
  const quizQuestionsRef = useRef<ApiQuestion[]>([]);

  useEffect(() => {
    QuizMiddleware.getQuiz(idAsNumber).then((quiz) => {
      quizRef.current = quiz;
      setShowQuizInfo(true);
    });

    QuizMiddleware.getQuizQuestions(idAsNumber).then((questions) => {
      quizQuestionsRef.current = questions;
      setShowQuestions(true);
      setInitialValues({
        answers: questions.map((question) => {
          return {
            userId: 1,
            quizId: idAsNumber,
            questionId: question.id,
            value: getAnswerDefaultValue(question)
          }
        })
      });
    });
  }, [id, idAsNumber]);

  const onSubmit = useCallback(async (values: IForm) => {
    setShowQuestions(false);

    const result = await QuizMiddleware.sendUserQuizAnswers(1, idAsNumber, values.answers);

    setResult(result);
  }, [])

  function renderForm({
    values,
    errors,
    setFieldValue,
  }: FormikProps<IForm>) {
    return (
      <Form className="createQuizForm">
        {quizQuestionsRef.current[currentQuestionIndex].type === "text" && (
          <InputField
            type="text"
            name={`answers[${currentQuestionIndex}].value`}
            placeholder="Write answer"
            value={values.answers[currentQuestionIndex].value as string}
            onChange={setFieldValue}
          />
        )}

        {quizQuestionsRef.current[currentQuestionIndex].type === "selectOne" && (
          <RadioFieldsGroup
            name={`answers[${currentQuestionIndex}].value`}
            value={values.answers[currentQuestionIndex].value as number}
            onChange={setFieldValue}
            data={quizQuestionsRef.current[currentQuestionIndex].answers!}
            displayPropertyName="text"
          />
        )}

        {quizQuestionsRef.current[currentQuestionIndex].type === "selectMany" && (
          <CheckboxFieldsGroup
            name={`answers[${currentQuestionIndex}].value`}
            value={values.answers[currentQuestionIndex].value as number[]}
            onChange={(value) => {
              const currentValue = values.answers[currentQuestionIndex].value as number[];

              setFieldValue(
                `answers[${currentQuestionIndex}].value`,
                currentValue.includes(value)
                  ? currentValue.filter((id) => id !== value)
                  : [...currentValue, value]
              )
            }}
            data={quizQuestionsRef.current[currentQuestionIndex].answers!}
            displayPropertyName="text"
          />
        )}

        <div className="submitButtonWrapper">
          {currentQuestionIndex < quizQuestionsRef.current.length - 1 && (
            <Button
              variant="secondary"
              text="Next question"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            />
          )}

          {currentQuestionIndex === quizQuestionsRef.current.length - 1 && (
            <SubmitButton text="Submit" />
          )}
        </div>
      </Form>
    )
  }

  return (
    <div className="quizContent">
      {showQuizInfo && quizRef.current && <QuizInfo name={quizRef.current.name} description={quizRef.current.description}  />}

      {showQuestions && quizQuestionsRef.current && (
        <div className="quizQuestions">
          <div className="questionsTitle">
            <Title text={`Question ${currentQuestionIndex + 1} of ${quizQuestionsRef.current.length}`} level={3} />
          </div>

          <div className="questionTextWrapper">
            <Text text={quizQuestionsRef.current[currentQuestionIndex].name} />
          </div>

          {initialValues && (
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {renderForm}
            </Formik>
          )}
        </div>
      )}

      {result && <QuizResult score={result.score} maxScore={quizQuestionsRef.current.length} />}
    </div>
  );
}
