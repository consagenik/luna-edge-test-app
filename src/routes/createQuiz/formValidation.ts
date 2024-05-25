import * as Yup from 'yup';

const validationSchema = () => Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  questions: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      type: Yup.string(),
      answers: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().required("Required"),
          isRight: Yup.boolean(),
        })
      )
        .test('hasAnswers', 'No answers', (answers, testContext) => {
          if (testContext.parent.type === "text") {
            return true;
          } else if (testContext.parent.type === "selectOne") {
            return !!(answers && answers.length > 1) && answers.some((answer) => answer.isRight);
          } else {
            const rightAnswers = answers?.filter((answer) => answer.isRight);
            return !!(answers && answers.length > 1) && rightAnswers!.length > 1 && rightAnswers!.length < answers!.length;
          }
        }),
    })
  ).min(2, 'Must have at least 2 questions')
});

export default validationSchema;
