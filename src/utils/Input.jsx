import React from "react";

const Input = ({ type, title }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm capitalize'>{title}</label>
      <input
        type={type}
        name={title}
        className='text-center border-b border-black'
      />
    </div>
  );
};

export default Input;
