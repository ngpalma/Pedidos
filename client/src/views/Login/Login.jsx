import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);

  const infoLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
    setIsLoginFormSubmitted(true);
    alert("Usuario logueado");
  };
  // const handleLogin = () => {
  //   // Aquí podrías agregar la lógica de autenticación
  //   alert("¡Bienvenido Usuario!");
  // };
  const onSuccess = (credentialResponse) => {
    var decoded = jwtDecode(credentialResponse.credential);

    setLoginData((prevInputs) => ({
      ...prevInputs,
      email: decoded.email,
      password: "logingoogle",
    }));
    setIsLoginFormSubmitted(true);
    console.log("response en onSuccess", decoded);
  };

  useEffect(() => {
    if (isLoginFormSubmitted) {
      dispatch(loginUser(loginData));
      console.log("inputs de segundo useEffect", loginData);
    }
  }, [isLoginFormSubmitted, dispatch, loginData]);

  useEffect(() => {
    if (isAuthenticated && isLoginFormSubmitted) {
      navigate("/userprofile");
    }
  }, [isAuthenticated, isLoginFormSubmitted, navigate]);

  return (
    <div>
      <div>Inicia sesión</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <span>Email</span>
              <input
                type="text"
                placeholder="Ingresa tu email"
                name="email"
                value={loginData.email}
                onChange={infoLogin}
              />
            </div>
            <div>
              <span>Contraseña</span>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={loginData.password}
                onChange={infoLogin}
              />
            </div>
          </div>
          <div>
            <input type="submit" value="Inicia sesión" />
          </div>
        </form>
        <div>
          <a href="/forgotpassword">Olvidé mi contraseña</a>
        </div>
        <div>
          <span>
            Aún no tenes una cuenta? <a href="/register"> Registrate aquí! </a>
          </span>
        </div>
        <div>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
