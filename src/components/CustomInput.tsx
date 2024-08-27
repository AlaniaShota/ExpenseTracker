interface InputProps {
  type: string;
  value?: string | number | any;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: string;
  name?: string;
}

const InputField: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  required = false,
  className = "",
  onBlur,
  error,
  name,
}) => {

  return (
    <>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={className}
        onBlur={onBlur}
        name={name}
      />
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default InputField;
