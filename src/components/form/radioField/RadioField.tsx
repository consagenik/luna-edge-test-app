import React from 'react';

import './RadioField.scss';

import {RadioButton} from "../radioButton";

interface RadioFieldProps {
  id: string
  label: string
  name: string
  value: boolean
  onChange: (name: string, value: boolean) => void
}

export default function RadioField({id, label, name, value, onChange}: RadioFieldProps) {
  return (
    <div className="radioField">
      <label htmlFor={id}>
        <input
          type="radio"
          name={name}
          id={id}
          checked={value}
          onChange={() => onChange(name, !value)}
        />
        <RadioButton checked={value}/>
        {label}
      </label>
    </div>
  );
}
