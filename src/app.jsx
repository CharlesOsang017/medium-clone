import { Navigate, Route, Routes } from "react-router-dom";
import Demo from "./components/demo/Demo";
import Home from "./components/home/Home";
import HomeHeader from "./components/home/header/HomeHeader";
import DemoHeader from "./components/demo/DemoHeader";
import { Blog } from "./context/Context";
import  { Toaster } from 'react-hot-toast';
import Profile from "./components/home/profile/Profile";
import Write from "./components/home/write/Write";

export function App() {
  const {currentUser} = Blog();
  return (
    <>
    <Toaster />
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        {currentUser && <Route path='/' element={<Home />} />}
        {!currentUser && <Route path='/demo' element={<Demo />} />}
        <Route path="/profile/:userId" element={<Profile />}/>
        <Route path="/write" element={<Write />}/>
        <Route
          path='*'
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
    </>
  );
}
