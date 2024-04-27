import { GET_PRODUCTS } from "./type";

const initialState = {
  allProducts: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };
  }
};

export default rootReducer;
