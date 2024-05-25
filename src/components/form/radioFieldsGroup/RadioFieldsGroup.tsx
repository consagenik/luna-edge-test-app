import React from 'react';

import './RadioFieldsGroup.scss';

import {RadioField} from "../radioField";

interface RadioFieldsGroupProps {
  name: string;
  value: number;
  data: any[];
  onChange: (key: string, value: number) => void;
  displayPropertyName?: string;
  label?: string;
}

export default function RadioFieldsGroup({name, label, value, data, onChange, displayPropertyName}: RadioFieldsGroupProps) {
  return (
    <div className="radioFieldsGroup">
      {label && <p className="label">{label}</p>}

      <div className="fieldsList">
        {data.map((item) => {
          console.log(item, item[displayPropertyName || 'name']);

          return (
            <RadioField
              id={item.id}
              key={item.id}
              label={item[displayPropertyName || 'name']}
              name={item.name}
              value={item.id === value}
              onChange={() => onChange(name, item.id)}
            />
          )
        })}
      </div>
    </div>
  );
}
