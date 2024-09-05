import { api } from "../../Component/config/api";
import { UPDATE_ORDER_STATUS_FAILUER, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, GET_RESTAURANTS_ORDER_FAILUER } from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST});
    try {
      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedOrder = response.data;
      console.log("updated order ",updatedOrder);

      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });

    } catch (error) {
        console.log(error);
        dispatch({ type: UPDATE_ORDER_STATUS_FAILUER, payload: error });
    }
  };
};

export const fetchRestaurantOrder = ({restaurantId, orderStatus,jwt}) => {
  return async (dispatch) => {
    try {
      dispatch({type: GET_RESTAURANTS_ORDER_REQUEST})
      
      const {data} = await api.get(
        `/api/admin/order/restaurants/${restaurantId}`,{
          params: {orderStatus:orderStatus},
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
      const orders = data;
      console.log("restaurant order ",orders);
      dispatch({type: GET_RESTAURANTS_ORDER_SUCCESS,payload:orders});

    } catch (error) {
      dispatch({type: GET_RESTAURANTS_ORDER_FAILUER, payload: error});
    }
  };
};