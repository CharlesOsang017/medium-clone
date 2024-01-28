import React from "react";

const Input = ({ type, title, form, setForm }) => {
  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
  }
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm capitalize'>{title}</label>
      <input
        type={type}
        name={title}
        onChange={handleChange}
        className='text-center border-b border-black'
      />
    </div>
  );
};

export default Input;
