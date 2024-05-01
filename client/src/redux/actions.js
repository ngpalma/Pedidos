import axios from "axios";

import {
  GET_PRODUCTS,
  GET_CLIENTS,
  GET_CLIENT_DETAIL,
  GET_PRODUCT_DETAIL,
} from "./type";

//------------------------PRODUCTS ACTIONS------------------------

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const products = await axios.get("/products");
      console.log(products);
      if (products) {
        dispatch({ type: GET_PRODUCTS, payload: products.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetail = (id) => {
  return async function (dispatch) {
    try {
      const product = await axios.get(`/products/${id}`);
      if (product) {
        dispatch({ type: GET_PRODUCT_DETAIL, payload: product.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//------------------------CLIENTS ACTIONS------------------------

export const getClients = () => {
  return async function (dispatch) {
    try {
      const clients = await axios.get("/clients");
      if (clients) {
        dispatch({ type: GET_CLIENTS, payload: clients.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClientDetail = (id) => {
  return async function (dispatch) {
    try {
      const client = await axios.get(`/products/${id}`);
      if (client) {
        dispatch({ type: GET_CLIENT_DETAIL, payload: client.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
