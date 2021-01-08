import axios from "../apiClient";
import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE } from "../types";

axios.defaults.withCredentials = true;

export function login(credentials) {
  return function (dispatch) {
    dispatch(loginStarted());
    return axios
      .post(`/login`, credentials)
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
      .get(`/auth/authenticate`)
      .then(({ data }) => {
        dispatch(authenticateSuccess(data));
      })
      .catch((err) => {
        console.log("buha");
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
