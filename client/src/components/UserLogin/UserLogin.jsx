import { useRef } from "react";
// import { CSSTransition } from "react-transition-group";
import userIcon from "../../assets/userLogin.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { cerrarSesion } from "../../../redux/actions";

const UserLogin = () => {
  // const [isUserMenuVisible, setUserMenuVisibility] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  // const dispatch = useDispatch();

  const handleMenuItemClick = (destination) => {
    // setUserMenuVisibility(false);
    console.log("handle menu item click");
    navigate(destination);
  };

  const showUserMenu = () => {
    // setUserMenuVisibility(true);
    console.log("show user menu");
  };

  const hideUserMenu = () => {
    // setUserMenuVisibility(false);
    console.log("hide user menu");
  };

  const handleLogout = () => {
    // dispatch(cerrarSesion());
    console.log("Se cierra la sesion");
  };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  // console.log(
  //   "userLogin, se envio cierre de sesion, autenticacion es:",
  //   isAuthenticated
  // );

  return (
    <div onMouseEnter={showUserMenu} onMouseLeave={hideUserMenu}>
      <img
        src={userIcon}
        alt="User Icon"
        style={{ width: 8 + "rem", height: 5 + "rem" }}
      />
      {/* <CSSTransition
        in={isUserMenuVisible}
        timeout={350}
        classNames="UserMenuAnimation"
        unmountOnExit
        nodeRef={userMenuRef}
      > */}
      <div ref={userMenuRef}>
        {isAuthenticated ? (
          <>
            <button onClick={() => handleMenuItemClick("/userProfile")}>
              Panel de Usuario
            </button>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <button onClick={() => handleMenuItemClick("/")}>Cliente</button>
          </>
        )}
      </div>
      {/* </CSSTransition> */}
    </div>
  );
};

export default UserLogin;
