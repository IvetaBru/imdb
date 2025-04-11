import { Routes, Route } from "react-router";
import Register from "./components/pages/Register";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="" element={<MainOutlet />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;
