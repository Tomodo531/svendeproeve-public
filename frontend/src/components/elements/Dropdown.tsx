import { ChangeEvent } from "react";

interface DropdownProps {
    label: string, 
    value: any, 
    options: { label: string; value: string; }[], 
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = (
  {
    label,
    value,
    options,
    onChange
  }: DropdownProps
) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

export default Dropdown