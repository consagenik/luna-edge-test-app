import ApiQuiz from "./entities/ApiQuiz";
import ApiUserQuizResult from "./entities/ApiUserQuizResult";
import ApiUserQuizAnswer from "./entities/ApiUserQuizAnswer";
import ApiQuestion from "./entities/ApiQuestion";

export const quizzes: ApiQuiz[] = [
  {
    id: 1,
    userId: 1,
    name: 'React JS quiz',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a turpis ut leo accumsan venenatis porta commodo ipsum. Pellentesque interdum leo enim, in vulputate orci vehicula sed. Aliquam consequat, nulla eu ultricies tincidunt, risus nibh venenatis arcu, auctor commodo sem quam et ligula. Donec ornare nisi at rutrum pellentesque. Sed et urna sit amet ante ultricies tincidunt nec nec massa. Duis tristique elit ac nisi dignissim, id tempus est venenatis. Aenean vestibulum faucibus tortor, ut iaculis odio consequat sit amet.',
    questionsQuantity: 3,
    time: 3
  },
  {
    id: 2,
    userId: 2,
    name: 'NextJS quiz',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum malesuada urna, tempor rutrum est laoreet at. Proin egestas leo eros, vitae accumsan leo elementum finibus. Ut et ultrices tortor, at molestie risus. Nam ut ligula luctus, aliquam dui non, vulputate diam. Phasellus pellentesque pulvinar nulla sed venenatis. Nulla mattis viverra fringilla. Vestibulum sed metus sed sapien volutpat dignissim.',
    questionsQuantity: 3,
    time: 3
  },
  {
    id: 3,
    userId: 1,
    name: 'React Native quiz',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae ipsum vulputate quam vulputate vestibulum ac sit amet velit. Fusce eu arcu nec lectus aliquam tempus eget non est. Sed vitae vestibulum risus. Donec gravida dolor vitae urna sodales vestibulum. Aliquam semper, lectus nec lacinia pulvinar, ligula felis rutrum ipsum, in mattis ligula nisi nec lacus. Phasellus nisl lorem, consectetur.',
    questionsQuantity: 3,
    time: 3
  },
]

export const quizQuestions: ApiQuestion[] = [
  {
    id: 1,
    quizId: 1,
    name: 'Question 1',
    type: 'selectOne',
    time: 1,
    answers: [
      {
        id: 1,
        text: 'Answer 1',
        isRight: false
      },
      {
        id: 2,
        text: 'Answer 2',
        isRight: true
      },
      {
        id: 3,
        text: 'Answer 3',
        isRight: false
      },
      {
        id: 4,
        text: 'Answer 4',
        isRight: false
      }
    ]
  },
  {
    id: 2,
    quizId: 1,
    name: 'Question 2',
    type: 'selectMany',
    time: 1.5,
    answers: [
      {
        id: 5,
        text: 'Answer 1',
        isRight: true
      },
      {
        id: 6,
        text: 'Answer 2',
        isRight: false
      },
      {
        id: 7,
        text: 'Answer 3',
        isRight: true
      },
      {
        id: 8,
        text: 'Answer 4',
        isRight: false
      }
    ]
  },
  {
    id: 3,
    quizId: 1,
    name: 'Question 3',
    type: 'text',
    time: 1,
  },
  {
    id: 11,
    quizId: 2,
    name: 'Question 1',
    type: 'selectOne',
    time: 1,
    answers: [
      {
        id: 11,
        text: 'Answer 1',
        isRight: false
      },
      {
        id: 12,
        text: 'Answer 2',
        isRight: true
      },
      {
        id: 13,
        text: 'Answer 3',
        isRight: false
      },
      {
        id: 14,
        text: 'Answer 4',
        isRight: false
      }
    ]
  },
  {
    id: 12,
    quizId: 2,
    name: 'Question 2',
    type: 'selectMany',
    time: 1.5,
    answers: [
      {
        id: 15,
        text: 'Answer 1',
        isRight: true
      },
      {
        id: 16,
        text: 'Answer 2',
        isRight: false
      },
      {
        id: 17,
        text: 'Answer 3',
        isRight: true
      },
      {
        id: 18,
        text: 'Answer 4',
        isRight: false
      }
    ]
  },
  {
    id: 13,
    quizId: 2,
    name: 'Question 3',
    type: 'text',
    time: 1,
  },
  {
    id: 21,
    quizId: 3,
    name: 'Question 1',
    type: 'selectOne',
    time: 1,
    answers: [
      {
        id: 21,
        text: 'Answer 1',
        isRight: false
      },
      {
        id: 22,
        text: 'Answer 2',
        isRight: true
      },
      {
        id: 23,
        text: 'Answer 3',
        isRight: false
      },
      {
        id: 24,
        text: 'Answer 4',
        isRight: false
      }
    ]
  },
  {
    id: 22,
    quizId: 3,
    name: 'Question 2',
    type: 'selectMany',
    time: 1.5,
    answers: [
      {
        id: 25,
        text: 'Answer 1',
        isRight: true
      },
      {
        id: 26,
        text: 'Answer 2',
        isRight: false
      },
      {
        id: 27,
        text: 'Answer 3',
        isRight: true
      },
      {
        id: 28,
        text: 'Answer 4',
        isRight: false
      }
    ]
  },
  {
    id: 23,
    quizId: 3,
    name: 'Question 3',
    type: 'text',
    time: 1,
  }
]

export const userQuizResults: ApiUserQuizResult[] = [
  {
    id: 2,
    userId: 1,
    quizId: 2,
    score: 4
  },
]

export const userQuizAnswers: ApiUserQuizAnswer[] = [
  {
    id: 1,
    userId: 1,
    quizId: 2,
    questionId: 11,
    value: 12,
    isCorrect: true
  },
  {
    id: 2,
    userId: 1,
    quizId: 2,
    questionId: 12,
    value: 15,
    isCorrect: true
  },
  {
    id: 3,
    userId: 1,
    quizId: 2,
    questionId: 12,
    value: 17,
    isCorrect: false
  },
  {
    id: 4,
    userId: 1,
    quizId: 2,
    questionId: 13,
    value: 'Some text'
  },
]
