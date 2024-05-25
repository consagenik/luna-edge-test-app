import React from 'react';

import './Header.scss';

import {HeaderNavigation} from "./headerNavigation";
import {HeaderLogo} from "./headerLogo";

export default function Header() {
  return (
    <header>
      <div className="container">
        <HeaderLogo />
        <HeaderNavigation />
      </div>
    </header>
  );
}
