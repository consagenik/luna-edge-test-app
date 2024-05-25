import React from 'react';

import './CheckboxButton.scss';

export interface ICheckboxButtonProps {
  checked: boolean;
}

export default function CheckboxButton({checked}: ICheckboxButtonProps) {
  return (
    <div className={checked ? `checkboxButton checked` : "checkboxButton"}>
      <div className="square"></div>
    </div>
  );
}
