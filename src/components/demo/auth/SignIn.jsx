// import { Input } from "postcss";
import React from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";

const SignIn = ({setSignReq}) => {
  return (
    <div className='size text-center mt-[6rem]'>
      <h2 className='text-3xl'>Sign in with email</h2>
      <p className='w-full mx-auto sm:w-[25rem] py-[3rem]'>
        Enter the email address associated with your account, and we will send a
        magic link to your inbox
      </p>
      <form className='flex flex-col gap-4'>
        <Input type='email' title='email' />
        <Input type='password' title='password' />
        <button className='px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto'>
          Sign In
        </button>
      </form>
      <button onClick={()=> setSignReq("")} className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All sign In Options
      </button>
    </div>
  );
};

export default SignIn;
