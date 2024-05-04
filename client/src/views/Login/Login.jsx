import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const infoLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
    alert("Usuario logueado");
  };
  // const handleLogin = () => {
  //   // Aquí podrías agregar la lógica de autenticación
  //   alert("¡Bienvenido Usuario!");
  // };

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
      </div>
    </div>
  );
};

export default Login;
