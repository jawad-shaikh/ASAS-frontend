import { InputProps } from "@/types";
import React from "react";

const FormInput: React.FC<InputProps> = ({
  register,
  name,
  errors,
  label,
  placeholder,
  type = "text"
}) => {
  return (
    <div className="mt-7 w-full">
      <label className="sr-only block mb-2 text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`block bg-transparent border-b w-full pb-2 outline-none ${errors[name] ? "border-red-500": "border-border"}`}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={errors[name] ? "true" : "false"}
      />
    </div>
  );
};

export default FormInput;