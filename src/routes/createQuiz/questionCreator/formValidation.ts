import * as Yup from 'yup';

const validationSchema = () => Yup.object({
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
});

export default validationSchema;
