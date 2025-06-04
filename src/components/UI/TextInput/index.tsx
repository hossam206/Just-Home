import React, { useState } from "react";
import { getAditionalStyles, TextInputStyles } from "./classNames";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { HandleError } from "@/src/utils/HandleError";

type TextInputProps = {
  label?: string;
  id: string;
  type?: string; // Input type (text, number, email, password, etc.)
  name: string;
  placeholder?: string;
  autocomplete?: string; // for passwordss inputs only make better Accessibility
  mandatory?: boolean;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  touched?: boolean;
  readOnly?: boolean;
};
const TextInput = ({
  label,
  id,
  type = "text",
  placeholder,
  mandatory = false,
  value,
  name,
  readOnly,
  onChange,
  onBlur,
  className = "",
  error,
  touched,
  autocomplete,
}: TextInputProps) => {
  const combinedStyles = getAditionalStyles(className);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className={TextInputStyles.labelStyle}>
          {label}
          {mandatory && <span className="text-red-500 text-md">*</span>}
        </label>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          id={id}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          value={value || ""}
          readOnly={readOnly}
          name={name}
          inputMode={type === "number" ? "numeric" : undefined}
          onChange={onChange}
          autoComplete={autocomplete}
          onBlur={onBlur}
          {...(type === "number" ? { min: 0 } : {})} // Ensure positive numbers for number type
          className={`${
            error && touched ? TextInputStyles.requiredInputStyle : ""
          } ${combinedStyles}`}
        />
        {/* Password visibility toggle */}
        {type === "password" && (
          <span
            className={TextInputStyles.showPasswordIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </span>
        )}
      </div>
      {/* Error Message */}
      {touched && error && <HandleError error={error} />}
    </div>
  );
};

export default TextInput;
