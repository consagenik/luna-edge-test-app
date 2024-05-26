import {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FieldArray, Form, Formik, FormikProps} from "formik";

import "./CreateQuiz.scss";

import validationSchema from "./formValidation";
import {QuizMiddleware} from "../../state/quiz";
import {EditingQuestion} from "../../entities";
import {ApiQuizCreateRequest} from "../../api/entities";
import {RoutePath} from "../routeConfig";

import {Button, InputField, Loader, PassiveQuestionItem, SubmitButton, TextareaField, Title} from "../../components";
import {QuestionCreator, QuestionCreatorFormType} from "./questionCreator";

interface IForm {
  name: string
  description: string
  questions: EditingQuestion[]
}

const defaultEmptyQuestion: EditingQuestion = {
  time: 0,
  name: "",
  type: "text"
}

const initialState: IForm = {
  name: "",
  description: "",
  questions: [],
};

export default function CreateQuiz() {
  const {id} = useParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<IForm>(initialState);
  const [isCreateQuizLoading, setIsCreateQuizLoading] = useState<boolean>(false);
  const [creatingOrEditing, setCreatingOrEditing] = useState<"create" | "edit">("create");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | undefined>(0);
  const [showQuestionCreator, setShowQuestionCreator] = useState<boolean>(false);

  const questionCreatorRef = useRef<FormikProps<QuestionCreatorFormType>>(null);
  const questionsFormRef = useRef<FormikProps<IForm>>(null);

  useEffect(() => {
    if (id) {
      const quizResponse = QuizMiddleware.getQuiz(parseInt(id));
      const questionsResponse = QuizMiddleware.getQuizQuestions(parseInt(id));
      Promise.all([quizResponse, questionsResponse]).then((res) => {
        setInitialValues({
          name: res[0].name,
          description: res[0].description,
          questions: res[1]
        })
      }).finally(() => {
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const onSubmit = useCallback(async (values: IForm) => {
    const quizData: ApiQuizCreateRequest = {
      name: values.name,
      description: values.description,
      userId: 1,
      questionsQuantity: values.questions.length,
      time: values.questions.reduce((acc, question) => acc + question.time, 0)
    }

    setIsCreateQuizLoading(true);

    const savedQuizData = id
      ? await QuizMiddleware.updateQuiz(1, parseInt(id), {...quizData, id: parseInt(id) })
      : await QuizMiddleware.createQuiz(1, quizData);
    const questions = values.questions.map((question) => {
      return {
        ...question,
        quizId: savedQuizData.id
      }
    })
    await QuizMiddleware.editQuizQuestions(savedQuizData.id, questions);

    setIsCreateQuizLoading(false);

    navigate(RoutePath.myQuizzes)
  }, [navigate])

  function handleShowQuestionCreator(activeQuestionIndex: number | undefined) {
    if (activeQuestionIndex === undefined) {
      setShowQuestionCreator(false);
    } else {
      setShowQuestionCreator(true);
    }
  }

  function renderForm({
    values,
    errors,
    setFieldValue,
  }: FormikProps<IForm>) {
    return (
      <Form className="createQuizForm">
        <div className="fieldsWrapper">
          <InputField
            type="text"
            name="name"
            label="Quiz name"
            placeholder="Write name"
            value={values.name}
            onChange={setFieldValue}
            error={errors.name}
          />
          <TextareaField
            type="text"
            name="description"
            label="Quiz description"
            placeholder="Write description"
            value={values.description}
            onChange={setFieldValue}
            error={errors.description}
          />
        </div>

        <FieldArray
          name="questions"
          render={arrayHelpers => (
            <div className="questionsList">
              <div className="addQuestionButtonWrapper">
                <Button
                  text="Add question"
                  onClick={() => {
                    arrayHelpers.push(defaultEmptyQuestion);
                    setCreatingOrEditing('create');
                    setActiveQuestionIndex(values.questions.length);
                    handleShowQuestionCreator(values.questions.length); // Call here
                  }}
                  disabled={showQuestionCreator}
                />
              </div>

              {values.questions.map((question, index) => (
                <PassiveQuestionItem
                  key={index}
                  editing={activeQuestionIndex === index}
                  question={question}
                  onClickEdit={() => {
                    setCreatingOrEditing('edit');
                    setActiveQuestionIndex(index);
                    handleShowQuestionCreator(index);
                  }}
                  onClickDelete={() => arrayHelpers.remove(index)}
                  disabledButtons={showQuestionCreator}
                />
              ))}
            </div>
          )}
        />

        <div className="submitButtonWrapper">
          <SubmitButton disabled={Object.keys(errors).length > 0} text={id ? "Update quiz" : "Create quiz"} isLoading={isCreateQuizLoading} />
        </div>
      </Form>
    )
  }

  return (
    <div className="createQuiz">
      <Title text="Create Quiz" />

      {isLoading && <Loader />}

      <div className="quizDashboard">
        <div className={showQuestionCreator ? "quizContentWrapper showedQuestionCreator" : "quizContentWrapper"}>
          {!isLoading && initialValues && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema()}
              innerRef={questionsFormRef}
            >
              {renderForm}
            </Formik>
          )}
        </div>

        {showQuestionCreator && activeQuestionIndex !== undefined && questionsFormRef.current && (
          <div className="quizCreatorWrapper">
            <QuestionCreator
              ref={questionCreatorRef}
              questionIndex={activeQuestionIndex}
              type={creatingOrEditing}
              value={questionsFormRef.current!.values.questions[activeQuestionIndex!]}
              onSave={(value) => {
                questionsFormRef.current!.values.questions[activeQuestionIndex!] = value;
                questionsFormRef.current!.setFieldValue('questions', questionsFormRef.current!.values.questions);
                setActiveQuestionIndex(undefined);
                setShowQuestionCreator(false);
              }}
              onCancel={() => {
                setActiveQuestionIndex(undefined);
                setShowQuestionCreator(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
