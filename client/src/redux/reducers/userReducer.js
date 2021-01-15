import { GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILURE } from "../types";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: { ...state.user, ...action.payload },
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
