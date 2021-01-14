import axios from "../apiClient";
import { LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE } from "../types";
import { fetchUser } from "./userAction";

axios.defaults.withCredentials = true;

export function login(credentials) {
  return function (dispatch) {
    dispatch(loginStarted());
    console.log(credentials);
    return axios
      .post(`/auth/login`, credentials)
      .then(({ data }) => {
        dispatch(loginSuccess(data));
      })
      .catch((err) => {
        dispatch(loginFailure(err.message));
        console.log(err);
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

export const authenticate = () => {
  return async (dispatch) => {
    dispatch(authenticateStarted());
    try {
      const { data } = axios.get(`/auth/authenticate`);
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
