import React from 'react';

import './Input.scss';

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (key: string, value: string) => void;
  label?: string;
  error?: string
}

export default function InputField({
  type,
  placeholder,
  label,
  name,
  value,
  onChange,
  error
}: InputProps) {
  return (
    <div className="inputWrapper">
      <div className="inputField">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
