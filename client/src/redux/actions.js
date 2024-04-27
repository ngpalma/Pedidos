import axios from "axios";

import { GET_PRODUCTS } from "./type";

export const getTools = () => {
  return async function (dispatch) {
    try {
      const products = await axios.get(`/products`);
      if (products) {
        dispatch({ type: GET_PRODUCTS, payload: products.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
