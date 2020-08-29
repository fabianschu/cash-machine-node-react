import React, { useContext } from "react";
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
  const {
    accordionExpanded,
    setAccordionExpanded,
    setCreatingInvoice,
    selectedProjects,
    selectedCustomer,
    editingCustomer,
    setEditingCustomer,
    setCreatingProject,
  } = useContext(UiContext);
  const { disabled, data } = props;

  const handleChange = () => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? true : false);
  };

  return (
    <div className={classes.accordion}>
      <Accordion
        expanded={accordionExpanded}
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
                      Steuernummer: ajsfbadbfdsjfabh{" "}
                      <span>{selectedCustomer.taxId}</span>
                    </Box>
                    <Box>
                      Stundensatz: <span>€{selectedCustomer.hourlyRate}</span>
                    </Box>
                  </Box>
                  <Box>
                    <ModalButton
                      handleClick={setEditingCustomer}
                      currentState={editingCustomer}
                      type="editCustomer"
                      disabled={!selectedCustomer}
                    />
                  </Box>
                </Box>
              </Paper>
              <Box className={classes.buttonBox}>
                <ModalButton
                  handleClick={() => setCreatingProject(true)}
                  type="createProject"
                  disabled={!selectedCustomer}
                  className={classes.printButton}
                />
                <ModalButton
                  handleClick={() => setCreatingInvoice(true)}
                  type="print"
                  disabled={selectedProjects.length === 0}
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
