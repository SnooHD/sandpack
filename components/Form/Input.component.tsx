import React, { InputHTMLAttributes } from "react";
import { Error } from "@/components/Form/Error.component";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({
  className = "",
  label,
  error,
  ...attrs
}: InputProps): JSX.Element => (
  <div className="w-full">
    <input
      aria-invalid={!!error}
      aria-errormessage="#form-error"
      aria-label={label}
      className={`
        bg-transparent w-full transition-colors duration-300
        autofill:bg-transparent autofill:border-b-light-focus dark:autofill:border-b-dark-focus
        outline-none focus-visible:outline-none focus-visible:border-b-focus dark:focus-visible:border-b-dark-focus
        placeholder:text-light-shade-1/20 dark:placeholder:text-dark-shade-1/20 placeholder:text-md
        border-b py-xs text-md w
        ${
          error
            ? "border-b-light-red dark:border-b-dark-red"
            : "border-light-shade-1 dark:border-dark-shade-1"
        }
        ${className}
      `}
      {...attrs}
    />
    <Error
      error={error}
      id="form-error"
    />
  </div>
);
