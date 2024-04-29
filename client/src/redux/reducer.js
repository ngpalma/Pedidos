import { GET_PRODUCTS, GET_CLIENTS } from "./type";

const initialState = {
  allProducts: [],
  allClients: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };
    case GET_CLIENTS:
      return {
        ...state,
        allClients: payload,
      };
  }
};

export default rootReducer;
