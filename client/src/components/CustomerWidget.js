import React, { useContext } from "react";
import ModalButton from "./ModalButton";
import Accordion from "./Accordion";
import Box from "@material-ui/core/Box";
import { UiContext } from "../context/UiContext";
import { DataContext } from "../context/DataContext";
import SelectOne from "./SelectOne";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../components/Modal";

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
  } = useContext(UiContext);
  const { customers } = useContext(DataContext);
  const classes = useStyles();

  return (
    <>
      <Box boxShadow={5}>
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
          title={selectedCustomer && selectedCustomer.firm}
        />
      </Box>
      <Modal />
    </>
  );
};

export default CustomerWidget;
