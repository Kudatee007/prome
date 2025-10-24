import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = "text", name, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col w-full space-y-1">
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 dark:text-gray-200 pb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            className={`w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all ${className}`}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;