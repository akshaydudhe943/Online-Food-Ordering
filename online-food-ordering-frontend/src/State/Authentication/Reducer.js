import { isPresentInFavorites } from "../../Component/config/logic";
import {
  ADD_TO_FAVORITE_FALIURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FALIURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FALIURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FALIURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  favorite: [],
  success: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
      return {
        ...state,
        isloading: true,
        error: null,
        success: null,
      };
    case LOGOUT:
        return initialState;
        
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        isloading: false,
        success: "Registration Successful",
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isloading: false,
        user: action.payload,
      };

    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        favorite: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
        isloading: false,
        error: null,
        success: "Added to favorite successfully",
      };
    case REGISTER_FALIURE:
    case LOGIN_FALIURE:
    case GET_USER_FALIURE:
    case ADD_TO_FAVORITE_FALIURE:
      return {
        ...state,
        isloading: false,
        error: action.payload,
        success: null,
      };
    default:
      return state;
  }
};
