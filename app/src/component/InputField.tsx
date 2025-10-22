import React from "react";

interface InputFieldProps {
  label?: string;
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  required = false,
  icon,
}) => {
  return (
    <div className="flex flex-col w-full space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={`w-full py-3 px-4 ${
            icon ? "pl-10" : ""
          } border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all`}
        />
      </div>
    </div>
  );
};

export default InputField;