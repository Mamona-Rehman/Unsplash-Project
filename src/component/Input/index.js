import React from "react";
const varients ={
  
  Primary:" h-10 text-sm font-normal  w-[600px] text-['#494949'] w-96 py-2 px-3  mb-1 leading-tight focus:outline-none focus:shadow-lg  ",
  
};

export const Input = ({
  varient,
  type,
  name,
  value,
  inputId,
  defaultValue,
  label,
  helperText,
  onChange,
  error,
  placeholder,
  textarea
}) => {
  return (
    <div>
      {label && <label className="block text-sm text-gray-900 font-bold mb-2">{label}</label>}

      {helperText && (
        <label className="block text-sm text-gray-600">{helperText}</label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        id={inputId}
        onChange={onChange}
        defaultValue={defaultValue}
        textarea={textarea}
        className={` ${varients[varient]}`}
      />

      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};
