import React from "react";
import {Link} from "react-router-dom";

import './HeaderLogo.scss';

import {LogoIcon} from "../../../../assets/icons";

export default function HeaderLogo() {
  return (
    <Link to="/" className="mainPageLink">
      <img src={LogoIcon} alt="Test app"/>
    </Link>
  );
}
