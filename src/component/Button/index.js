import React from "react";

const variants = {
  primary:
    "  font-normal text-base text-white   relative transition-colors  before:absolute  before:h-[46px] before:w-[141px] before:origin-top-left before:rounded-[6px] before:scale-x-0  before:transition-transform before:duration-300 before:content-[''] hover:text-white before:bg-[#b39359] before:hover:scale-x-100  rounded-[8px] shadow-none w-[141px] h-[46px] bg-[#0B2C3D] ",
    dwnbtn:' invisible group-hover:visible bottom-5 right-5 bg-slate-100 hover:bg-white  p-2 rounded  w-10 h-10 ',
    addbtn:' invisible group-hover:visible top-5 right-5 bg-slate-100 hover:bg-white  p-2 rounded  w-10 h-10 ',
    delbtn:' invisible group-hover:visible top-5 right-[70px] bg-slate-100 hover:bg-white  p-2 rounded  w-10 h-10 ',
    setbtn:' invisible group-hover:visible top-5 left-5 bg-slate-100 hover:bg-white  p-2 rounded  w-10 h-10 ',
    tagbtn:' invisible group-hover:visible bottom-5 left-5 bg-slate-100 hover:bg-white  p-2 rounded  w-10 h-10 ',
  secondry:" hover:text[#b39359]  text-base font-normal text-['#494949'] ",
  danger: "bg-red-600 text-white hover:enabled:bg-red-700 focus:ring-red-500",
  naked: "hover:text-gray-600 text-gray-500 shadow-none",
  setting:"pt-2 text-black text-sm rounded"
};

const sizes = {
  Loginbutton:"h-11 w-32 text-xs  ",
  small: "px-2 py-1 text-xs leading-1",
  medium: "px-4 py-2 text-sm",
  large: "px-4 py-2 text-base",
};

export const Button = ({
  className,
  variant = "primary",
  size = "small",
  ...props
}) => {
  return (
    <button
      className={`inline-flex justify-center items-center border border-transparent
            rounded-md font-medium  focus:outline-none 
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
            ${variants[variant]}
            ${sizes[size]}
            `}
      {...props}
    />
  );
};
