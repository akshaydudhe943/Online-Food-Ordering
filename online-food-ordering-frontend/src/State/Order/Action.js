import { api } from "../../Component/config/api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
} from "../Order/ActionType";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post(`/api/orders`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      //payment getway commented out time 6:47:23 Build a Food Ordering Website in 2024 with React, Tailwind | Connect Frontend With Spring boot
      console.log("create order data", data);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("error creating order data ", error);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    }
  };
};

export const getUsersOrder = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const { data } = await api.get(`/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("users order ", data);
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("error getting users order ", error);
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error });
    }
  };
};
