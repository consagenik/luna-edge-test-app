import React from 'react';

import './TextareaField.scss';

interface TextareaFieldProps {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onChange: (key: string, value: string) => void;
  error?: string
}

export default function TextareaField({
  placeholder,
  label,
  name,
  value,
  onChange,
  error
}: TextareaFieldProps) {
  return (
    <div className="textareaWrapper">
      <div className="textareaField">
        <label htmlFor={name}>{label}</label>
        <textarea
          rows={4}
          id={name}
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
