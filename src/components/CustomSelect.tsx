import React from "react";
import Select, { StylesConfig, GroupBase } from "react-select";

interface Option {
  value: string;
  label: React.ReactNode;
}

const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    color: "black",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "blue" : "white",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

interface CustomSelectProps {
  options: Option[];
  onChange: (option: Option | null) => void;
  placeholder?: string;
  value?: Option;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
      value={value}
    />
  );
};

export default CustomSelect;
