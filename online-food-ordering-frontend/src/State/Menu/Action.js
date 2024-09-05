import { api } from "../../config/api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/food`, menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
      console.log("Menu item created successfully", data);
    } catch (error) {
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
      console.log("Error in creating menu item", error.message);
    }
  };
};

export const getMenuItemByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?
        vegetarian=${reqData.vegetarian}
        &nonVeg=${reqData.nonveg}
        &seasonal=${reqData.seasonal}
        &food_category=${reqData.foodCategory}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
      console.log("Menu items fetched successfully", data);
    } catch (error) {
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
      console.log("Error in fetching menu items", error.message);
    }
  };
};

export const searchMenuItems = ({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.get(`/api/food/search?name=${keyword}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data});
            console.log("Menu items fetched successfully", data);
        } catch (error) {
            dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload: error});
            console.log("Error in fetching menu items", error);
        }
    }
};

export const updateMenuItemsAvailability = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.put(`/api/admin/food/${foodId}`,{},{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data});
            console.log("Menu item availability updated successfully");
        } catch (error) {
            dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error});
            console.log("Error in updating menu item availability", error);
        }
    }
};

export const deleteFoodAction = ({foorId,jwt}) => {
    async (dispatch) => {
        dispatch({type: DELETE_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.delete(`/api/admin/food/${foodId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                }
            });
            dispatch({type: DELETE_MENU_ITEM_SUCCESS,payload:data});
            console.log("Menu item deleted successfully ", data);
        } catch (error) {
            dispatch({type: DELETE_MENU_ITEM_FAILURE,payload:error});
            console.log("Menu item failed to delete",error);
        }
    }
};