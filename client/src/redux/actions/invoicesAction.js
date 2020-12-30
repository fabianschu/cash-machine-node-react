import axios from "axios";
import {
  GET_INVOICES_STARTED,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  SAVE_INVOICE_STARTED,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAILURE,
  UPDATE_INVOICE_STARTED,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
} from "../types";

export function fetchInvoices() {
  return function (dispatch) {
    dispatch(getInvoicesStarted());
    return axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/invoices`)
      .then(({ data }) => {
        dispatch(getInvoicesSuccess(data));
      })
      .catch((err) => {
        dispatch(getInvoicesFailure(err.message));
      });
  };
}

const getInvoicesStarted = () => ({
  type: GET_PROJECTS_STARTED,
});

const getInvoicesSuccess = (invoices) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: [...invoices],
});

const getInvoicesFailure = (error) => ({
  type: GET_PROJECTS_FAILURE,
  payload: {
    error,
  },
});

export function saveProject(invoice) {
  return function (dispatch) {
    dispatch(saveProjectStarted());
    return axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/invoices`, invoice)
      .then(({ data }) => {
        dispatch(saveProjectSuccess(data));
      })
      .catch((err) => {
        dispatch(saveProjectFailure(err.message));
      });
  };
}

const saveProjectStarted = () => ({
  type: SAVE_PROJECT_STARTED,
});

const saveProjectSuccess = (invoice) => ({
  type: SAVE_PROJECT_SUCCESS,
  payload: {
    invoice,
  },
});

const saveProjectFailure = (error) => ({
  type: SAVE_PROJECT_FAILURE,
  payload: {
    error,
  },
});

export function updateProject(invoice) {
  return function (dispatch) {
    dispatch(updateProjectStarted());
    return axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/invoices/${invoice.id}`,
        invoice
      )
      .then(({ data }) => {
        dispatch(updateProjectSuccess(data));
      })
      .catch((err) => {
        dispatch(updateProjectFailure(err.message));
      });
  };
}

const updateProjectStarted = () => ({
  type: UPDATE_PROJECT_STARTED,
});

const updateProjectSuccess = (invoice) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: {
    invoice,
  },
});

const updateProjectFailure = (error) => ({
  type: UPDATE_PROJECT_FAILURE,
  payload: {
    error,
  },
});
