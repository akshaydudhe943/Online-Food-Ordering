import { api } from "../../Component/config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_EVENT_FAILURE,
  GET_RESTAURANT_EVENT_REQUEST,
  GET_RESTAURANT_EVENT_SUCCESS,
  UPADTE_RESTAURANT_STATUS_FAILURE,
  UPADTE_RESTAURANT_STATUS_REQUEST,
  UPADTE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionTypes";

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
      console.log("All Restaurants", data);
    } catch (error) {
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
      console.log("Error in getting all restaurants", error.message);
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
      console.log("Restaurant ", response);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
      console.log("Error in getting restaurants by Id ", error);
    }
  };
};

export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurants/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
      console.log("Restaurant by userId ", data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
      console.log("Error in getting restaurants by userId ", error);
    }
  };
};

export const createRestaurant = (reqData) => {
  console.log("token...................", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("Restaurant created successfully");
    } catch (error) {
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
      console.log("Error in creating restaurants ", error);
    }
  };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPADTE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `/api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPADTE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
      console.log("Restaurant upadted successfully");
    } catch (error) {
      dispatch({ type: UPADTE_RESTAURANT_STATUS_FAILURE, payload: error });
      console.log("Error in updating restaurants ", error);
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    try {
      const res = await api.delete(`/api/admin/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
      console.log("Restaurant deleted successfully");
    } catch (error) {
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
      console.log("Error in deleting restaurants ", error);
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPADTE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `/api/admin/restaurant/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPADTE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
      console.log("Restaurant status updated successfully");
    } catch (error) {
      dispatch({ type: UPADTE_RESTAURANT_STATUS_FAILURE, payload: error });
      console.log("Error in updating restaurant's status", error);
    }
  };
};

export const createEventAction = ({ data, jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: restaurantId });
      console.log("event created successfully");
    } catch (error) {
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
      console.log("Error in creating event ", error);
    }
  };
};

export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
      const {data} = await api.get(
        `/api/events`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: data });
      console.log("event get successfully ",data);
    } catch (error) {
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
      console.log("Error in getting event ", error);
    }
  };
};

export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
      const res = await api.delete(
        `/api/admin/events${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
      console.log("event deleted successfully ",res.data);
    } catch (error) {
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
      console.log("Error in deleting event ", error);
    }
  };
};

export const getRestaurantsEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_EVENT_REQUEST });

    try {
      const {data} = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_EVENT_SUCCESS, payload: data });
      console.log("Restaurant's event get successfully ",data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_EVENT_FAILURE, payload: error });
      console.log("Error in getting restaurant's event ", error);
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const {data} = await api.post(
        `/api/admin/category`,reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
      console.log("category created successfully ",data);
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
      console.log("Error in creating category ", error);
    }
  };
};

export const getRestaurantsCategory = ({jwt, restaurantId}) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      const {data} = await api.get(`/api/category/restaurant${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: data });
      console.log("Successfully get Restaurant category ", data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
      console.log("Error in getting restaurant;s category ", error);
    }
  };
};
