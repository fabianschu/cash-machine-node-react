import axios from "../apiClient";
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

export function register(credentials) {
  return function (dispatch) {
    dispatch(registerStarted());
    return axios
      .post(`/auth/register`, credentials)
      .then(({ data }) => {
        dispatch(registerSuccess(data));
      })
      .catch((err) => {
        dispatch(registerFailure(err.message));
      });
  };
}

const registerStarted = () => ({
  type: REGISTER_STARTED,
});

const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data.id,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: {
    error,
  },
});
