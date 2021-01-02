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
  type: GET_INVOICES_STARTED,
});

const getInvoicesSuccess = (invoices) => ({
  type: GET_INVOICES_SUCCESS,
  payload: [...invoices],
});

const getInvoicesFailure = (error) => ({
  type: GET_INVOICES_FAILURE,
  payload: {
    error,
  },
});

export function saveInvoice(invoice) {
  return function (dispatch) {
    dispatch(saveInvoiceStarted());
    return axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/invoices`, invoice)
      .then(({ data }) => {
        dispatch(saveInvoiceSuccess(data));
      })
      .catch((err) => {
        dispatch(saveInvoiceFailure(err.message));
      });
  };
}

const saveInvoiceStarted = () => ({
  type: SAVE_INVOICE_STARTED,
});

const saveInvoiceSuccess = (invoice) => ({
  type: SAVE_INVOICE_SUCCESS,
  payload: {
    invoice,
  },
});

const saveInvoiceFailure = (error) => ({
  type: SAVE_INVOICE_FAILURE,
  payload: {
    error,
  },
});

export function updateInvoice(invoice) {
  return function (dispatch) {
    dispatch(updateInvoiceStarted());
    return axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/invoices/${invoice.id}`,
        invoice
      )
      .then(({ data }) => {
        dispatch(updateInvoiceSuccess(data));
      })
      .catch((err) => {
        dispatch(updateInvoiceFailure(err.message));
      });
  };
}

const updateInvoiceStarted = () => ({
  type: UPDATE_INVOICE_STARTED,
});

const updateInvoiceSuccess = (invoice) => ({
  type: UPDATE_INVOICE_SUCCESS,
  payload: {
    invoice,
  },
});

const updateInvoiceFailure = (error) => ({
  type: UPDATE_INVOICE_FAILURE,
  payload: {
    error,
  },
});
