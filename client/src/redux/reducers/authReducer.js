import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_STARTED,
  AUTHENTICATE_SUCCESS,
} from "../types";

const initialState = {
  userId: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AUTHENTICATE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: action.payload,
      };
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
