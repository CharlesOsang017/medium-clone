// import { Input } from "postcss";
import React from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";

const SignUp = ({setSignReq}) => {
  return (
    <div className='size text-center mt-[6rem]'>
      <h2 className='text-3xl'>Sign up with email</h2>
      <p className='w-full mx-auto sm:w-[25rem] py-[3rem]'>
        Enter the email address associated with your account, and we will send a
        magic link to your inbox
      </p>
      <form className='flex flex-col gap-4'>
        <Input type='username' title='username' />
        <Input type='email' title='email' />
        <Input type='password' title='password' />
        <Input type='password' title='confirm Password' />
        <button className='px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto'>
          Sign UP
        </button>
      </form>
      <button onClick={()=> setSignReq("")} className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All sign Up Options
      </button>
    </div>
  );
};

export default SignUp;
