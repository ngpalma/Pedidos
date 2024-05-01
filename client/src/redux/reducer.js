import {
  GET_PRODUCTS,
  GET_CLIENTS,
  GET_CLIENT_DETAIL,
  GET_PRODUCT_DETAIL,
} from "./type";

const initialState = {
  //------------------------PRODUCTS STATES------------------------
  allProducts: [],
  productDetail: {}, //detalle de un solo producto por ID
  productsShown: [], //productos que se renderizan

  //------------------------CLIENTS STATES------------------------
  allClients: [],
  clientDetail: {}, //detalle de un solo cliente por ID

  //------------------------USERS STATES------------------------
  isAuthenticated: false, //para saber si esta logueado el usuario

  //------------------------PAGINATION STATES------------------------
  currentPage: 1, //pagina actual para el paginado
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //------------------------PRODUCTS------------------------
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        productsShown: payload,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload,
      };
    //------------------------CLIENTS------------------------
    case GET_CLIENTS:
      return {
        ...state,
        allClients: payload,
      };
    case GET_CLIENT_DETAIL:
      return {
        ...state,
        clientDetail: payload,
      };
    //------------------------USERS------------------------

    //------------------------PAGINATION------------------------

    //DEFAULT
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
