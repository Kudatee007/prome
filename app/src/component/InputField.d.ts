import React from "react";
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    placeholder?: string;
    "data-testid"?: string;
}
declare const InputField: React.ForwardRefExoticComponent<InputFieldProps & React.RefAttributes<HTMLInputElement>>;
export default InputField;
