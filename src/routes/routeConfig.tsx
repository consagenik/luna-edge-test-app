import React from "react";
import {RouteObject} from "react-router-dom";

import {AllQuizzes} from "./allQuizzes";
import {UserQuizzes} from "./userQuizzes";
import {CreateQuiz} from "./createQuiz";
import {Error} from "./error";
import {Quiz} from "./quiz";

export enum AppRoutes {
  ALL_QUIZZES = 'quizzesList',
  MY_QUIZZES = 'myQuizzes',
  CREATE_QUIZ = 'createQuiz',
  EDIT_QUIZ = 'editQuiz',
  QUIZ = 'quiz',

  // last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.ALL_QUIZZES]: '/',
  [AppRoutes.MY_QUIZZES]: '/myQuizzes',
  [AppRoutes.CREATE_QUIZ]: '/quiz/create',
  [AppRoutes.EDIT_QUIZ]: '/quiz/:id/edit',
  [AppRoutes.QUIZ]: '/quiz/:id',

  // last
  [AppRoutes.NOT_FOUND]: '*'
}

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath[AppRoutes.ALL_QUIZZES],
    element: <AllQuizzes />
  },
  {
    path: RoutePath[AppRoutes.MY_QUIZZES],
    element: <UserQuizzes />
  },
  {
    path: RoutePath[AppRoutes.CREATE_QUIZ],
    element: <CreateQuiz />
  },
  {
    path: RoutePath[AppRoutes.EDIT_QUIZ],
    element: <CreateQuiz />
  },
  {
    path: RoutePath[AppRoutes.QUIZ],
    element: <Quiz />
  },
  {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <Error />
  }
]
