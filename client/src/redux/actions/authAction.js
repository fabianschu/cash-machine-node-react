import axios from "../apiClient";
import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_STARTED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types";
import { fetchUser } from "./userAction";

axios.defaults.withCredentials = true;

export function login(credentials) {
  return function (dispatch) {
    dispatch(loginStarted());
    return axios
      .post(`/auth/login`, credentials)
      .then(({ data }) => {
        dispatch(loginSuccess(data));
      })
      .catch((err) => {
        dispatch(loginFailure(err.message));
      });
  };
}

const loginStarted = () => ({
  type: LOGIN_STARTED,
});

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data.id,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});

export function logout() {
  return function (dispatch) {
    dispatch(logoutStarted());
    return axios
      .get(`/auth/logout`)
      .then(({ data }) => {
        dispatch(logoutSuccess(data));
      })
      .catch((err) => {
        dispatch(logoutFailure(err.message));
      });
  };
}

const logoutStarted = () => ({
  type: LOGOUT_STARTED,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: {
    error,
  },
});

export const authenticate = () => {
  return async (dispatch) => {
    dispatch(authenticateStarted());
    try {
      const { data } = await axios.get(`/auth/authenticate`);
      dispatch(fetchUser());
      dispatch(authenticateSuccess(data));
    } catch (err) {
      dispatch(authenticateFailure(err.message));
    }
  };
};

const authenticateStarted = () => ({
  type: LOGIN_STARTED,
});

const authenticateSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data.id,
});

const authenticateFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});
