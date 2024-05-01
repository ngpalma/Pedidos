import { useNavigate } from "react-router-dom";

const Product = (product) => {
  const navigate = useNavigate();

  return (
    <div key={product.id}>
      <div>
        <img
          src={product.image}
          alt={product.image}
          onClick={() => navigate(`/detail/${product.id}`)}
        />
        <div>
          <h3>{product.brand}</h3>
          <h3>{product.name}</h3>
          <p>
            {" "}
            {product.type} {""} {product.volume} {""} {product.size}
          </p>
        </div>
        <div>
          <h3>${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
