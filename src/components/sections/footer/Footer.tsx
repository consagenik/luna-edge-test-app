import React from 'react';
import {Link} from "react-router-dom";

import './Footer.scss';

import {LogoIcon} from "../../../assets/icons";

import {Text} from "../../common/text";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="linkWrapper">
          <Link to="/" className="mainPageLink">
            <img src={LogoIcon} alt="Test app"/>
          </Link>
        </div>
        <Text text="Copyright © 2024. All rights reserved."/>
      </div>
    </footer>
  );
}
