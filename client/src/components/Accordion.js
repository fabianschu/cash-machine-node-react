import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ModalButton from "./ModalButton";
import Table from "./Table";
import { UiContext } from "../context/UiContext";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   flexBasis: "33.33%",
  //   flexShrink: 0,
  // },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionContent: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  printButton: {
    alignSelf: "flex-end",
  },
  accordion: {
    padding: "20px",
  },
  wrapBox: {
    width: "90%",
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
  } = useContext(UiContext);
  const { disabled, data, title } = props;

  const handleChange = () => (event, isExpanded) => {
    console.log(isExpanded);
    setAccordionExpanded(isExpanded ? true : false);
  };

  return (
    <div>
      <Accordion
        expanded={accordionExpanded}
        onChange={handleChange(true)}
        elevation={0}
        square
        disabled={disabled}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {selectedCustomer && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              className={classes.wrapBox}
            >
              <ModalButton
                handleClick={setEditingCustomer}
                currentState={editingCustomer}
                type="edit"
                disabled={!selectedCustomer}
              />
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
                  Steuernummer: <span>{selectedCustomer.taxId}</span>
                </Box>
                <Box>
                  Stundensatz: <span>€{selectedCustomer.hourlyRate}</span>
                </Box>
              </Box>
            </Box>
          )}

          {/* <Typography className={classes.heading}>Show Details</Typography>
          <Typography className={classes.secondaryHeading}>{title}</Typography> */}
        </AccordionSummary>
        <AccordionDetails p={0} className={classes.accordionContent}>
          <Table rows={data} />
          <ModalButton
            handleClick={() => setCreatingInvoice(true)}
            type="print"
            disabled={selectedProjects.length === 0}
            className={classes.printButton}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
