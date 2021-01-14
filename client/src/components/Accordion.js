import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Paper from "@material-ui/core/Paper";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ModalButton from "./ModalButton";
import Table from "./Table";
import { UiContext } from "../context/UiContext";
import Box from "@material-ui/core/Box";
import { toggleCustomerEdit } from "../redux/actions/customersAction";
import {
  toggleProjectCreation,
  toggleProjectEdit,
} from "../redux/actions/projectsAction";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  accordionContent: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  accordionSummary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
    height: "100%",
  },
  paper: {
    padding: "15px 0",
    border: `2px solid ${theme.palette.primary.main}`,
    flexGrow: 1,
    marginRight: "32px",
    display: "flex",
    flexDirection: "column",
  },
  customerDetails: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },
  buttonBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const { setCreatingInvoice } = useContext(UiContext);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const { disabled, selectedCustomer, data } = props;

  const selectedProjects = useSelector(
    ({ projectsReducer }) => projectsReducer.selectedProjects
  );

  useEffect(() => {
    if (!selectedCustomer) {
      setExpanded(false);
      return;
    }

    if (selectedCustomer) {
      setExpanded(true);
    }
  }, [selectedCustomer]);

  const handleChange = () => (event, isExpanded) => {
    setExpanded(isExpanded ? true : false);
  };

  return (
    <div className={classes.accordion}>
      <Accordion
        expanded={expanded}
        onChange={handleChange(true)}
        elevation={0}
        square
        disabled={disabled}
        // className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {selectedCustomer && (
            <Box className={classes.accordionSummary}>
              <Paper className={classes.paper} elevation={0}>
                <Box className={classes.customerDetails}>
                  <Box fontWeight="bold">Kundendetails:</Box>
                  <Box>
                    <Box>
                      <Box>{selectedCustomer.firm}</Box>
                      <Box>{selectedCustomer.street}</Box>
                      <Box>
                        {selectedCustomer.zip} {selectedCustomer.city}
                      </Box>
                      <Box>{selectedCustomer.country}</Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      Steuernummer: {selectedCustomer.customerId}
                      <span>{selectedCustomer.taxId}</span>
                    </Box>
                    <Box>
                      Stundensatz: <span>€{selectedCustomer.hourlyRate}</span>
                    </Box>
                  </Box>
                  <Box>
                    <ModalButton
                      handleClick={toggleCustomerEdit}
                      type="editCustomer"
                      disabled={!selectedCustomer}
                    />
                  </Box>
                </Box>
              </Paper>
              <Box className={classes.buttonBox}>
                <ModalButton
                  handleClick={toggleProjectCreation}
                  type="createProject"
                  disabled={!selectedCustomer}
                  className={classes.printButton}
                />
              </Box>
            </Box>
          )}
          {/* <Typography className={classes.heading}>Show Details</Typography>
          <Typography className={classes.secondaryHeading}>{title}</Typography> */}
        </AccordionSummary>
        <AccordionDetails p={0} className={classes.accordionContent}>
          {selectedCustomer && <Table rows={data} />}
          <Box mt={2}>
            <ModalButton
              handleClick={() => ({ type: "TOGGLE_INVOICE_CREATION" })}
              type="createInvoice"
              disabled={selectedProjects.length === 0}
              className={classes.printButton}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
