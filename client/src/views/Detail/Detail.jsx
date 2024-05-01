import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/actions";

const Detail = () => {
  const product = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    try {
      dispatch(getProductDetail(id));
    } catch (error) {
      console.log("Error al obtener los datos del producto:", error);
    }
  }, [dispatch, id]);

  if (!product) return <div>Esperando carga del producto...</div>;

  return (
    <div>
      <div>
        <div>
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <h3>Marca: {product.brand}</h3>
          <br></br>
          <h3>
            {product.name} {product.type} {""} {product.volume} {""}{" "}
            {product.size}
          </h3>
          <br></br>
          <h3>Precio ${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
