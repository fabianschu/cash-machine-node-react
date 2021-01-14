import React, { useContext, useEffect } from "react";
import ModalButton from "./ModalButton";
import Accordion from "./Accordion";
import Box from "@material-ui/core/Box";
import { UiContext } from "../context/UiContext";
import { DataContext } from "../context/DataContext";
import SelectOne from "./SelectOne";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  selectCustomer,
} from "../redux/actions/customersAction";
import { fetchProjects } from "../redux/actions/projectsAction";
import { fetchInvoices } from "../redux/actions/invoicesAction";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  outer: {
    padding: "20px 16px",
    backgroundColor: "white",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
}));

const MainWidget = (props) => {
  const dispatch = useDispatch();
  const {
    creatingCustomer,
    // selectedCustomer,
    setCreatingCustomer,
  } = useContext(UiContext);
  // const { customers } = useContext(DataContext);
  const classes = useStyles();
  const customers = useSelector(
    ({ customersReducer }) => customersReducer.customers
  );
  const selectedCustomer = useSelector(
    ({ customersReducer }) => customersReducer.selectedCustomer
  );
  const error = useSelector(({ customersReducer }) => customersReducer.error);
  const loading = useSelector(
    ({ customersReducer }) => customersReducer.loading
  );
  const { customerId } = useParams();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProjects());
    dispatch(fetchInvoices());
  }, []);
  console.log(selectedCustomer);
  return (
    <>
      <Box boxShadow={5}>
        <Box className={classes.outer}>
          <ModalButton
            handleClick={setCreatingCustomer}
            currentState={creatingCustomer}
            type="createCustomer"
            m={0}
          />
          {customers && (
            <SelectOne
              options={customers}
              handleSelection={selectCustomer}
              selected={selectedCustomer}
              type="Kunden"
              display="firm"
            />
          )}
        </Box>
        <Accordion
          disabled={!selectedCustomer}
          selectedCustomer={selectedCustomer}
        />
      </Box>
      <Modal />
    </>
  );
};

export default MainWidget;
