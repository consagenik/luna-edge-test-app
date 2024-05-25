import React from "react";
import {Link} from "react-router-dom";

import './HeaderNavigationLink.scss';

interface HeaderNavigationLinkProps {
  name: string,
  path: string,
  isActive: boolean
}

export default function HeaderNavigationLink({name, path, isActive}: HeaderNavigationLinkProps) {
  return (
    <Link
      to={path}
      className={isActive ? "headerNavigationLink active" : "headerNavigationLink "}
    >
      {name}
    </Link>
  );
}
