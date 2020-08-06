import React, { useContext, useEffect } from "react";
import ModalButton from "./ModalButton";
import Accordion from "./Accordion";
import Box from "@material-ui/core/Box";
import { UiContext } from "../context/UiContext";
import { CustomersContext } from "../context/CustomersContext";
import SelectOne from "./SelectOne";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  outer: {
    padding: "20px",
    backgroundColor: "white",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  },
}));

const CustomerWidget = (props) => {
  const {
    creatingCustomer,
    selectedCustomer,
    setCreatingCustomer,
    setSelectedCustomer,
    mode,
  } = useContext(UiContext);
  const { customers, projects, setCustomers } = useContext(CustomersContext);
  const classes = useStyles();

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_SERVER_URL}/api/customers`)
  //     .then((customers) => {
  //       setCustomers(customers.data);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <Box>
      <Box className={classes.outer}>
        <Box className={classes.inner}>
          <ModalButton
            handleClick={setCreatingCustomer}
            currentState={creatingCustomer}
            type="create"
          />
          <SelectOne
            options={customers}
            handleSelection={setSelectedCustomer}
            selected={selectedCustomer}
            type="Kunden"
            display="firm"
          />
        </Box>
      </Box>
      <Accordion
        disabled={!selectedCustomer}
        data={projects}
        title={selectedCustomer && selectedCustomer.firm}
      />
    </Box>
  );
};

export default CustomerWidget;
