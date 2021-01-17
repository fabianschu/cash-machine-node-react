import React, { useState, useEffect } from "react";
import { toggleCustomerEdit } from "../redux/actions/customersAction";
import { toggleProjectCreation } from "../redux/actions/projectsAction";
import { useSelector } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ModalButton from "./ModalButton";
import Table from "./Table";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import StyledSubHeading from "../styled/SubHeading";
import StyledSoftButton from "../styled/SoftButton";
import { useDispatch } from "react-redux";

const StyledAccordion = withStyles({
  root: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
    marginTop: "8px",
    "&$disabled": {
      backgroundColor: "white",
    },
  },
  disabled: {
    backgroundColor: "white",
  },
})(Accordion);

const StyledAccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: 0,
  },
  expandIcon: {
    color: theme.palette.primary.light,
  },
}))(AccordionSummary);

const StyledAccordionDetails = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
})(AccordionDetails);

const StyledCustomerSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.light};
  padding: ${({ theme }) => `${theme.spacing(3)}px 0`};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledCustomerDetails = styled.div`
  max-width: 600px;
  flex: 1;
  margin: ${({ theme }) => `0 ${theme.spacing(2)}px;`};
  display: flex;
  justify-content: space-between;
`;

const StyledButtonContainer = styled.div`
  align-self: flex-end;
  width: 272px;
  text-align: right;
`;

const SpacedButtonContainer = styled(StyledButtonContainer)`
  margin: ${({ theme }) => `${theme.spacing(3)}px 0`};
`;

const StyledCustomerSubheading = styled.p`
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledCustomerAdditionals = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledProjectsSection = styled.div`
  padding: ${({ theme }) => `${theme.spacing(3)}px 0`};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export default function ControlledAccordions(props) {
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
    <StyledAccordion
      expanded={expanded}
      onChange={handleChange(true)}
      elevation={0}
      disabled={disabled}
    >
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} />
      <>
        <StyledAccordionDetails p={0}>
          <StyledCustomerSection>
            <StyledSubHeading>Kundendetails</StyledSubHeading>
            <StyledCustomerDetails>
              {selectedCustomer && (
                <>
                  <div>
                    <StyledCustomerSubheading>Adresse</StyledCustomerSubheading>
                    <div>{selectedCustomer.firm}</div>
                    <div>{selectedCustomer.street}</div>
                    <div>
                      {selectedCustomer.zip} {selectedCustomer.city}
                    </div>
                    <div>{selectedCustomer.country}</div>
                  </div>
                  <StyledCustomerAdditionals>
                    <div>
                      <StyledCustomerSubheading>
                        Steuernummer
                      </StyledCustomerSubheading>
                      <div>{selectedCustomer.taxId}</div>
                    </div>
                    <div>
                      <StyledCustomerSubheading>
                        Stundensatz
                      </StyledCustomerSubheading>
                      <div>{selectedCustomer.hourlyRate}€</div>
                    </div>
                  </StyledCustomerAdditionals>
                </>
              )}
            </StyledCustomerDetails>
            <StyledButtonContainer>
              <StyledSoftButton
                onClick={() => dispatch(toggleCustomerEdit())}
                variant="text"
              >
                Bearbeiten
              </StyledSoftButton>
            </StyledButtonContainer>
          </StyledCustomerSection>
          <StyledProjectsSection>
            <StyledSubHeading>Projekte</StyledSubHeading>
            <ModalButton
              handleClick={toggleProjectCreation}
              type="createProject"
              disabled={!selectedCustomer}
            />
          </StyledProjectsSection>
          {selectedCustomer && <Table rows={data} />}
          <SpacedButtonContainer>
            <ModalButton
              handleClick={() => ({ type: "TOGGLE_INVOICE_CREATION" })}
              type="createInvoice"
              disabled={selectedProjects.length === 0}
            />
          </SpacedButtonContainer>
        </StyledAccordionDetails>
      </>
    </StyledAccordion>
    // <div className={classes.accordion}>
    //   <Accordion
    // expanded={expanded}
    // onChange={handleChange(true)}
    // elevation={0}
    // square
    // disabled={disabled}
    //     // className={classes.accordion}
    //   >
    // <AccordionSummary
    //   expandIcon={<ExpandMoreIcon color="secondary" />}
    //   aria-controls="panel1bh-content"
    //   id="panel1bh-header"
    // >
    //       {selectedCustomer && (
    //         <Box className={classes.accordionSummary}>
    //           <Paper className={classes.paper} elevation={0}>
    //             <Box className={classes.customerDetails}>
    //               <Box fontWeight="bold">Kundendetails:</Box>
    //               <Box>
    //                 <Box>
    //                   <Box>{selectedCustomer.firm}</Box>
    //                   <Box>{selectedCustomer.street}</Box>
    //                   <Box>
    //                     {selectedCustomer.zip} {selectedCustomer.city}
    //                   </Box>
    //                   <Box>{selectedCustomer.country}</Box>
    //                 </Box>
    //               </Box>
    //               <Box>
    //                 <Box>
    //                   Steuernummer: {selectedCustomer.customerId}
    //                   <span>{selectedCustomer.taxId}</span>
    //                 </Box>
    //                 <Box>
    //                   Stundensatz: <span>€{selectedCustomer.hourlyRate}</span>
    //                 </Box>
    //               </Box>
    //               <Box>
    // <ModalButton
    //   handleClick={toggleCustomerEdit}
    //   type="editCustomer"
    //   disabled={!selectedCustomer}
    // />
    //               </Box>
    //             </Box>
    //           </Paper>
    //           <Box className={classes.buttonBox}>
    // <ModalButton
    //   handleClick={toggleProjectCreation}
    //   type="createProject"
    //   disabled={!selectedCustomer}
    //   className={classes.printButton}
    // />
    //           </Box>
    //         </Box>
    //       )}
    //       {/* <Typography className={classes.heading}>Show Details</Typography>
    //       <Typography className={classes.secondaryHeading}>{title}</Typography> */}
    //     </AccordionSummary>
    // <AccordionDetails p={0} className={classes.accordionContent}>
    //   {selectedCustomer && <Table rows={data} />}
    //   <Box mt={2}>
    //     <ModalButton
    //       handleClick={() => ({ type: "TOGGLE_INVOICE_CREATION" })}
    //       type="createInvoice"
    //       disabled={selectedProjects.length === 0}
    //       className={classes.printButton}
    //     />
    //   </Box>
    // </AccordionDetails>
    //   </Accordion>
    // </div>
  );
}
