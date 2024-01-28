import { Navigate, Route, Routes } from "react-router-dom";
import Demo from "./components/demo/Demo";
import Home from "./components/home/Home";
import HomeHeader from "./components/home/HomeHeader";
import DemoHeader from "./components/demo/DemoHeader";
import { Blog } from "./context/Context";

export function App() {
  const {currentUser} = Blog();
  return (
    <>
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
