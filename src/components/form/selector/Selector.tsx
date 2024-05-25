import './Selector.scss';

interface SelectorProps {
  data: any[];
  keyName: string;
  name: string;
  value: any;
  onChange: (value: any) => void;
  label?: string;
  disabled?: boolean;
}

export default function Selector({data, keyName, name, value, onChange, label, disabled}: SelectorProps) {
  return (
    <div className={disabled ? "selector disabled" : "selector"}>
      {label && <label htmlFor={name}>{label}</label>}

      <select
        name={name}
        id={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {data.map((item) => (
          <option key={item[keyName]} value={item[keyName]}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
