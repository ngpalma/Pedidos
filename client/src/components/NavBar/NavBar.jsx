import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import UserLogin from "../UserLogin/UserLogin";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/home")}>
        {" "}
        <img src="#" alt="logoHome" />{" "}
      </button>
      <SearchBar />
      <div>
        <div>
          <button onClick={() => navigate("/register")}> Registrarse </button>
        </div>
        <button onClick={() => navigate("/cart")}>
          {" "}
          <img src="#" alt="logoCart" />{" "}
        </button>
        <UserLogin />
      </div>
    </div>
  );
};

export default NavBar;
