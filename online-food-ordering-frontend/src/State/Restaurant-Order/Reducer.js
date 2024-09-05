import {
    GET_RESTAURANTS_ORDER_FAILUER,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILUER,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";

const initialState = {
  loadind: false,
  error: null,
  orders: [],
};

const restaurantOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS_ORDER_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_RESTAURANTS_ORDER_SUCCESS:
      return { ...state, loading: false, error: null, orders: action.payload };

    case UPDATE_ORDER_STATUS_SUCCESS:
      const updatedOrder = state.orders.find((order) =>
        order.id === action.payload.id ? action.payload : order
      );
      return { ...state, loading: false, orders: updatedOrder, error: null };


    case GET_RESTAURANTS_ORDER_FAILUER:
    case UPDATE_ORDER_STATUS_FAILUER:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default restaurantOrderReducer;