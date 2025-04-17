import { Routes, Route } from "react-router";
import Register from "./components/pages/Register";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AddNewMovie from "./components/pages/AddNewMovie";
import User from "./components/pages/User";
import SpecificCard from "./components/pages/SpecificCard";
import CastAndCrew from "./components/pages/CastAndCrew";
import Watchlist from "./components/pages/Watchlist";

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="" element={<MainOutlet />}>
        <Route index element={<Home />} />
        <Route path="watchlist" element={<Watchlist />}/>
        <Route path="addMovie" element={<AddNewMovie />}/>
        <Route path="user" element={<User />} />
        <Route path="/movie/:id" element={<SpecificCard />}/>
        <Route path="/movie/:id/castAndCrew" element={<CastAndCrew />}/>
      </Route>
    </Routes>
    </>
  )
}
export default App;
