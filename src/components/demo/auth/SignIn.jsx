// import { Input } from "postcss";
import {useState} from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import toast from "react-hot-toast";

const SignIn = ({setSignReq}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(form[('email', 'password')] === ''){
      toast.error('All fields are required!')
    }
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/')
      toast.success('logged in successfully!')
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='size text-center mt-[6rem]'>
      <h2 className='text-3xl'>Sign in with email</h2>
      <p className='w-full mx-auto sm:w-[25rem] py-[3rem]'>
        Enter the email address associated with your account, and we will send a
        magic link to your inbox
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input form={form} setForm={setForm} type='email' title='email' />
        <Input form={form} setForm={setForm} type='password' title='password' />
        <button className={`px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto ${loading ? 'opacity-50 pointer-events-none' : ""}`}>
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
