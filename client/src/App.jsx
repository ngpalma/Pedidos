import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { NavBar, Contact, Error404 } from "../src/components/index";
import {
  Home,
  Login,
  Register,
  Detail,
  DashboardClient,
  DashboardAdmin,
  About,
  ShoppingCart,
  ForgotPassword
} from "../src/views/index";

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
        <Route path="*" element={<Error404 />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />        
      </Routes>
    </div>
  );
}

export default App;
