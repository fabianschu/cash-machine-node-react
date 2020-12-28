import {
  GET_PROJECTS_STARTED,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SAVE_PROJECT_STARTED,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  UPDATE_PROJECT_STARTED,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
} from "../types";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [state.projects, ...action.payload],
      };
    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SAVE_PROJECT_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SAVE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SAVE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_PROJECT_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
