import { useState } from "react";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { auth, db, provider } from "../../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = ({modal, setModal}) => {
  const [createUser, setCreateUser] = useState(false);
  const [signReq, setSignReq] = useState("");
  const navigate = useNavigate()
  // const [modal, setModal] = useState(false);

  const googleAuth = async ()=>{
    try {
      const createUser = await signInWithPopup(auth, provider)
      const newUser = createUser.user;

      const ref = doc(db, 'users', newUser.uid);
      const userDoc = await getDoc(ref)
      if(!userDoc.exists()){
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: ''
        })
        navigate('/')
        toast.success('signed in successfully!')
        setModal(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // const hidden = {}
  
  const hidden =  modal ? "visible opacity-100" : "invisible opacity-0"

  return (
    <Modal modal={modal} setModal={setModal} hidden={hidden}>
      <section
        className={`z-50 fixed top-0 bottom-0 left-0 overflow-auto right-0 bg-white shadows md:right-[10rem] md:left-[10rem] ${modal ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-500`}
      >
        <button onClick={()=>setModal(false)} className='hover:opacity-50 absolute top-8 right-8 text-2xl'>
          <LiaTimesSolid />
        </button>
        <div className='flex flex-col justify-center items-center gap-[3rem]'>
          {signReq === "" ? (
            <>
              <h2 className='text-2xl pt-[5rem]'>
                {createUser ? "Join Medium" : "Welcome Back"}
              </h2>
              <div className='flex flex-col gap-2 w-fit mx-auto'>
                <Button
                click={googleAuth}
                  icon={<FcGoogle className='text-xl' />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Google`}
                />
                <Button
                  icon={<MdFacebook className='text-xl text-blue-600' />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Facaebook`}
                />
                <Button
                  click={() => setSignReq(createUser ? "sign-up" : "sign-in")}
                  icon={<AiOutlineMail className='text-xl' />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Email`}
                />
              </div>
              <p>
                {createUser ? "Already have an account?" : "No Account?"}
                <button
                  onClick={() => setCreateUser(!createUser)}
                  className='text-green-600 hover:text-green-600 font-bold ml-1'
                >
                  {createUser ? "Sign In" : "Create One"}
                </button>
              </p>
            </>
          ) : signReq === "sign-in" ? (
            <SignIn setSignReq={setSignReq} setModal={setModal} />
          ) : signReq === "sign-up" ? (
            <SignUp setSignReq={setSignReq}  setModal={setModal}/>
          ) : null}
          <p className='mx-auto text-center text-sm md:w-[30rem] mb-[3rem]'>
            click 'Sign In' to agree to Medium's terms of service and
            acknowledge that medium's privacy policy applies to you
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <button
      onClick={click}
      className='flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full'
    >
      {icon} {text}
    </button>
  );
};
