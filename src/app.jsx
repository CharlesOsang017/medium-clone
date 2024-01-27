import { Route, Routes } from "react-router-dom";
import Demo from "./components/demo/Demo";
import Home from "./components/home/Home";
import HomeHeader from "./components/home/HomeHeader";
import DemoHeader from "./components/demo/DemoHeader";

export function App() {
  const auth = false;
  return (
    <>
    {auth ? <HomeHeader /> : <DemoHeader />}
    <Routes>
      <Route path='/demo' element={<Demo />}/>
      <Route path='/' element={<Home />}/>
    </Routes>
    </>
  )
}
