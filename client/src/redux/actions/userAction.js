import axios from "axios";
import { GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILURE } from "../types";

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
