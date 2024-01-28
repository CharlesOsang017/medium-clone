// import { Input } from "postcss";
import { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setSignReq, setModal }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form[("username", "email", "password", "confirmPassword")] === "") {
      toast.error("All fields are required!");
    } else if (form["password"] !== form["confirmPassword"]) {
      toast.error("password does not match!");
      return;
    } else {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const ref = doc(db, "users", user.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: user.uid,
          username: form.username,
          email: form.email,
          userImg: "",
          bio: "",
        });
        navigate("/");
        toast.success("the user is created successfully");
        setModal(false);
        setLoading(false);
      }
    }
  };
  return (
    <div className='size text-center mt-[6rem]'>
      <h2 className='text-3xl'>Sign up with email</h2>
      <p className='w-full mx-auto sm:w-[25rem] py-[3rem]'>
        Enter the email address associated with your account, and we will send a
        magic link to your inbox
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input form={form} setForm={setForm} type='username' title='username' />
        <Input form={form} setForm={setForm} type='email' title='email' />
        <Input form={form} setForm={setForm} type='password' title='password' />
        <Input
          form={form}
          setForm={setForm}
          type='password'
          title='confirmPassword'
        />
        <button className={`px-4 py-1 text-sm rounded-full bg-green-700 hover:bg-green-800 text-white w-fit mx-auto ${loading ? 'opacity-50 pointer-events-none' : ""}`}>
          Sign UP
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className='mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto'
      >
        <MdKeyboardArrowLeft />
        All sign Up Options
      </button>
    </div>
  );
};

export default SignUp;
