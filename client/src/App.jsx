import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "../src/components/NavBar/NavBar";
import Home from "../src/views/Home/Home";
import Login from "../src/views/Login/Login";
import Register from "../src/views/Register/Register";
import Detail from "../src/views/Detail/Detail";
import DashboardClient from "./views/DashboardClient/DashboardClient";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin";
import About from "./views/About/About";
import Contact from "./components/Contact/Contact";
import ShoppingCart from "./views/ShoppingCart/ShoppingCart";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/register" && (
        <NavBar />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/client" element={<DashboardClient />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
