import React from 'react';

import './CheckboxFieldsGroup.scss';

import {CheckboxField} from "../checkboxField";

interface CheckboxFieldsGroupProps {
  name: string;
  value: number[];
  data: any[];
  onChange: (value: number) => void;
  displayPropertyName?: string;
  label?: string;
}

export default function CheckboxFieldsGroup({name, label, value, data, onChange, displayPropertyName}: CheckboxFieldsGroupProps) {
  return (
    <div className="checkboxFieldsGroup">
      {label && <p className="label">{label}</p>}

      <div className="fieldsList">
        {data.map((item, index ) => (
          <CheckboxField
            id={item.id}
            key={item.id}
            label={item[displayPropertyName || 'name']}
            name={`${name}.value`}
            value={value.includes(item.id)}
            onChange={(name, value) => onChange(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
