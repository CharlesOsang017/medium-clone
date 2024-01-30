import { Navigate, Route, Routes } from "react-router-dom";
import Demo from "./components/demo/Demo";
import Home from "./components/home/Home";
import HomeHeader from "./components/home/header/HomeHeader";
import DemoHeader from "./components/demo/DemoHeader";
import { Blog } from "./context/Context";
import  { Toaster } from 'react-hot-toast';

export function App() {
  const {currentUser} = Blog();
  return (
    <>
    <Toaster />
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        {currentUser && <Route path='/' element={<Home />} />}
        {!currentUser && <Route path='/demo' element={<Demo />} />}
        <Route
          path='*'
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
    </>
  );
}
