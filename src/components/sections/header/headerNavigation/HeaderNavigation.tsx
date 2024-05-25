import React from "react";

import './HeaderNavigation.scss';

import {HeaderNavigationLink} from "../headerNavigationLink";

const navLinks = [
  {
    name: "All Quizzes",
    path: "/"
  },
  {
    name: "My Quizzes",
    path: "/myQuizzes"
  }
]

export default function HeaderNavigation() {
  const {pathname} = window.location;

  return (
    <nav className="headerNavigation">
      <ul>
        {navLinks.map(({name, path}) => (
          <li key={path}>
            <HeaderNavigationLink path={path} name={name} isActive={pathname === path} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
