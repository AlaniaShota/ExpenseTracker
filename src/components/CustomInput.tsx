import React from "react";

interface InputProps {
  type: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  required = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className={className}
    />
  );
};

export default InputField;
