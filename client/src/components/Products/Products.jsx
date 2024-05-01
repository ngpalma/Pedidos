import { useEffect } from "react";
import { Product } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
// import Pagination from "../../Pagination/Pagination";

const Products = () => {
  const allProducts = useSelector((state) => state.productsShown);
  // const currentPage = useSelector((state) => state.currentPage);
  // const itemsPerPage = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getProducts());
    } catch (error) {
      console.log("Error al obtener los datos de los productos", error);
    }
  }, [dispatch]);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const productsToShow = allProducts.slice(startIndex, endIndex);

  // if (productsToShow.length === 0) {
  //   return <div>No hay herramientas para mostrar en esta página.</div>;
  // }

  return (
    <div>
      {/* <div>
        <Pagination />
      </div> */}
      <div>
        {allProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      {/* <div>
        <Pagination />
      </div> */}
    </div>
  );
};

export default Products;
