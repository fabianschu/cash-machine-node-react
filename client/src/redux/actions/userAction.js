import axios from "../apiClient";
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

export function fetchUser() {
  return function (dispatch) {
    dispatch(getUserStarted());
    return axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/user_profile`)
      .then(({ data }) => {
        dispatch(getUserSuccess(data));
      })
      .catch((err) => {
        dispatch(getUserFailure(err.message));
      });
  };
}

export function updateUser(user) {
  return async (dispatch) => {
    dispatch(updateUserStarted());
    try {
      const { data } = await axios.put(`/user_profile`, user);
      dispatch(updateUserSuccess(data));
      dispatch(fetchUser());
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };
}

const updateUserStarted = () => ({
  type: UPDATE_USER_STARTED,
});

const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    user,
  },
});

const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: {
    error,
  },
});

export function saveUser(user) {
  return async (dispatch) => {
    dispatch(saveUserStarted());
    try {
      const { data } = await axios.post(`/user_profile`, user);
      dispatch(saveUserSuccess(data));
    } catch (err) {
      dispatch(saveUserFailure(err.message));
    }
  };
}

const saveUserStarted = () => ({
  type: SAVE_USER_STARTED,
});

const saveUserSuccess = (user) => ({
  type: SAVE_USER_SUCCESS,
  payload: {
    user,
  },
});

const saveUserFailure = (error) => ({
  type: SAVE_USER_FAILURE,
  payload: {
    error,
  },
});

const getUserStarted = () => ({
  type: GET_USER_STARTED,
});

const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: { ...user },
});

const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: {
    error,
  },
});

export const toggleUserProfileEdit = () => ({
  type: TOGGLE_USER_EDIT,
});
