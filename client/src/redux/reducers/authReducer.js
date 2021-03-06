import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_STARTED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
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
    case REGISTER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case LOGOUT_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userId: null,
      };
    case LOGOUT_FAILURE:
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
