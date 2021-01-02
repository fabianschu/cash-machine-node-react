import axios from "axios";
import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE } from "../types";

axios.defaults.withCredentials = true;

export function login(credentials) {
  return function (dispatch) {
    dispatch(loginStarted());
    return axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, credentials)
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

export function authenticate() {
  return function (dispatch) {
    dispatch(authenticateStarted());
    return axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/auth`)
      .then(({ data }) => {
        dispatch(authenticateSuccess(data));
      })
      .catch((err) => {
        dispatch(authenticateFailure(err.message));
      });
  };
}

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
