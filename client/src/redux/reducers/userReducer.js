import {
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SAVE_USER_STARTED,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILURE,
  UPDATE_USER_STARTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  TOGGLE_USER_EDIT,
} from "../types";

const initialState = {
  user: {},
  loading: false,
  error: null,
  editingUserProfile: false,
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
    case UPDATE_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: { ...state.user, ...action.payload },
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SAVE_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: { ...state.user, ...action.payload },
      };
    case SAVE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case TOGGLE_USER_EDIT:
      return {
        ...state,
        editingUserProfile: !state.editingUserProfile,
      };
    default:
      return state;
  }
};
