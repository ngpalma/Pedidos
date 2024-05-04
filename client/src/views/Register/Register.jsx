import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions";

const Register = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rPassword: "",
  });

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [property]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si las contraseñas coinciden
    if (user.password !== user.rPassword) {
      console.log("Las contraseñas no coinciden");
      alert("Las contraseñas no coinciden")
      return;
    }

    dispatch(registerUser(user)).then(() => {
      console.log("Registro exitoso");
      alert("Registro Exitoso")
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rPassword: "",
      });
    });
  };

  return (
    <div>
      <div>Registro</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <span>Nombre</span>
              <input
                type="text"
                name="firstName"
                placeholder="Ingresa tu nombre"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Apellido</span>
              <input
                type="text"
                name="lastName"
                placeholder="Ingresa tu apellido"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Email</span>
              <input
                type="text"
                name="email"
                placeholder="Ingresa tu email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <span>Contraseña</span>
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Confirmar Contraseña</span>
              <input
                type="password"
                name="rPassword"
                placeholder="Confirma tu contraseña"
                value={user.rPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <input type="submit" value="Registrate" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
