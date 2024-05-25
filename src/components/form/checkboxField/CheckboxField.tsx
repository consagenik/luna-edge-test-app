import React from 'react';

import './CheckboxField.scss';

import {CheckboxButton} from "../checkboxButton";

interface CheckboxFieldProps {
  id: string
  label: string
  name: string
  value: boolean
  onChange: (name: string, value: boolean) => void
}

export default function CheckboxField({id, label, name, value, onChange}: CheckboxFieldProps) {
  return (
    <div className="checkboxField">
      <label htmlFor={id}>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={value}
          onChange={() => onChange(name, !value)}
        />
        <CheckboxButton checked={value}/>
        {label}
      </label>
    </div>
  );
}
