import { useLocation, Link } from "react-router-dom";

const Error404 = () => {
  const location = useLocation();

  return (
    <div>
      <div>
        <h1>Página no encontrada</h1>
      </div>

      <div>
        <h2>404</h2>
      </div>

      <div>
        <p>
          Lo sentimos, la página <span>{location.pathname} </span>no se
          encuentra o no existe{" "}
        </p>
      </div>

      <div>
        <p>
          ⚠️ Es posible que la página que estás buscando haya sido eliminada,
          haya cambiado su nombre o no esté disponible temporalmente.
          <br />
        </p>
      </div>

      <div>
        <Link to="/home">
          <button>Volver a la página principal</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
