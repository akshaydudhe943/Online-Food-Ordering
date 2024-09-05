import { api } from "../../Component/config/api";

import {
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORIES_SUCCESS,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "../Ingredients/ActionType";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/ingredients/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get all ingredients", response.data);
      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createIngredient = ({ data, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
      const response = await api.post(`/api/admin/ingredients`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create ingredient", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS });
    } catch (error) {
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
      console.log(error);
    }
  };
};

export const createIngredientCategory = ({ data, jwt }) => {
  console.log("data ", data, "jwt ", jwt);
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients/category`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create ingredient category", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS });
    } catch (error) {}
  };
};

export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/ingredients/restaurant/${id}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get ingredient category", response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORIES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateStockOfIngredient = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${id}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("update stock of ingredient", data);
      dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
