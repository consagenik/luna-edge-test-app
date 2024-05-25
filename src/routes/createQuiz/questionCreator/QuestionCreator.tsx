import {forwardRef, useCallback, useEffect, useState} from "react";
import {FieldArray, Form, Formik, FormikProps} from "formik";
import {FormikHelpers} from "formik/dist/types";

import "./QuestionCreator.scss";

import {EditingQuestion} from "../../../entities";
import {ApiAnswer, ApiQuestionType} from "../../../api/entities";

import validationSchema from "./formValidation";

import {Button, InputField, QuizQuestionAnswerVariant, Selector, SubmitButton, Title} from "../../../components";

interface Option {
  name: string;
  value: ApiQuestionType;
}

const options: Option[] = [
  {
    name: "Text",
    value: "text",
  },
  {
    name: "Single Choice",
    value: "selectOne",
  },
  {
    name: "Multiple Choice",
    value: "selectMany",
  },
]

export interface QuestionCreatorFormType {
  name: string
  type: ApiQuestionType
  time: string
  answers?: ApiAnswer[]
  rightAnswer?: number
}

const initialState: QuestionCreatorFormType = {
  name: "",
  type: "text",
  time: "0",
};

interface QuestionCreatorProps {
  questionIndex: number;
  type: "create" | "edit" | undefined;
  value: EditingQuestion;
  onSave: (value: EditingQuestion) => void;
  onCancel: () => void;
}

const QuestionCreator = forwardRef<FormikProps<QuestionCreatorFormType>, QuestionCreatorProps>((
  {
    questionIndex,
    type,
    value,
    onSave,
    onCancel
  }, ref
) => {
  const [initialValues, setInitialValues] = useState<QuestionCreatorFormType>();

  useEffect(() => {
    if (type === "edit") {
      setInitialValues({
        name: value.name,
        type: value.type,
        time: value.time.toString(),
        answers: value.answers,
        ...(value.type === "selectOne" && {rightAnswer: value.answers?.findIndex((answer) => answer.isRight)}),
      });
    } else {
      setInitialValues(initialState);
    }
  }, [type, questionIndex]);

  function renderForm({
    values,
    errors,
    setFieldValue,
  }: FormikProps<QuestionCreatorFormType>) {
    return (
      <Form className="questionCreatorForm">
        <Selector
          data={options}
          keyName="value"
          name="type"
          value={values.type}
          onChange={(value) => setFieldValue('type', value)}
          label="Question type"
          disabled={type === "edit"}
        />

        <InputField
          type="text"
          name="name"
          label="Question name"
          placeholder="Write question name"
          value={values.name}
          onChange={setFieldValue}
        />

        {(values.type === "selectOne" || values.type === "selectMany" )&& (
          <FieldArray
            name="answers"
            render={(arrayHelpers) => (
              <div className="answers">
                <Button
                  text="Add answer"
                  onClick={() => arrayHelpers.push({text: ""})}
                />

                {values.answers?.map((answer, index) => (
                  <QuizQuestionAnswerVariant
                    key={index}
                    value={answer.text}
                    onChange={(name, value) => {
                      if (name === "isRight" && values.type === "selectOne") {
                        if (value && values.rightAnswer !== undefined) {
                          arrayHelpers.replace(values.rightAnswer as number, {...values.answers![values.rightAnswer as number], isRight: false});
                        }

                        if (value) {
                          setFieldValue("rightAnswer", index);
                        } else {
                          setFieldValue("rightAnswer", undefined);
                        }
                      }

                      arrayHelpers.replace(index, {...answer, [name]: value});
                    }}
                    onDelete={() => arrayHelpers.remove(index)}
                    isRight={answer.isRight}
                    answerIndex={index}
                    questionIndex={questionIndex}
                  />
                ))}
              </div>
            )}
          />
        )}

        <InputField
          type="number"
          name="time"
          label="Time in minutes"
          placeholder="Write estimated time in minutes"
          value={values.time}
          onChange={setFieldValue}
        />

        <div className="actionButtons">
          <SubmitButton disabled={Object.keys(errors).length > 0} text="Save"/>
          <Button text="Cancel" onClick={onCancel} />
        </div>
      </Form>
    )
  }

  const onSubmit = useCallback(async (values: QuestionCreatorFormType, formikHelpers: FormikHelpers<QuestionCreatorFormType>) => {
    onSave({...values, time: parseInt(values.time)});
    formikHelpers.resetForm();
  }, [onSave])

  return (
    <div className="questionCreator">
      <Title text="Create/edit question" level={2} />

      {initialValues && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema()}
          innerRef={ref}
          enableReinitialize
        >
          {renderForm}
        </Formik>
      )}
    </div>
  );
});

export default QuestionCreator;
