import React, { useEffect } from "react";
import ModalButton from "./Inputs/ModalButton";
import Accordion from "./Accordion";
import SelectOne from "./Inputs/SelectOne";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  selectCustomer,
  toggleCustomerCreation,
} from "../redux/actions/customersAction";
import { fetchProjects } from "../redux/actions/projectsAction";
import { fetchInvoices } from "../redux/actions/invoicesAction";
import { fetchUser } from "../redux/actions/userAction";
import styled from "styled-components";
import StyledSubHeading from "../styled/SubHeading";
import StyledWidgetContainer from "../styled/WidgetContainer";

const StyledMainWidget = styled(StyledWidgetContainer)`
  min-width: 700px;
  padding-bottom: 6px;
`;

const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const MainWidget = (props) => {
  const dispatch = useDispatch();
  const customers = useSelector(
    ({ customersReducer }) => customersReducer.customers
  );
  const selectedCustomer = useSelector(
    ({ customersReducer }) => customersReducer.selectedCustomer
  );
  const accordionExpanded = useSelector(
    ({ uiReducer }) => uiReducer.accordionExpanded
  );

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProjects());
    dispatch(fetchInvoices());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <StyledMainWidget>
        <StyledFlexBox>
          <div>
            <StyledSubHeading>LOG HOURS,</StyledSubHeading>
            <StyledSubHeading>CREATE PROJECTS</StyledSubHeading>
            <StyledSubHeading>AND BILLS</StyledSubHeading>
          </div>
          <SelectOne
            options={customers.filter((customer) => customer.active)}
            handleSelection={selectCustomer}
            selected={selectedCustomer}
            type="Kunden"
            display="firm"
          />
          <ModalButton
            handleClick={toggleCustomerCreation}
            type="createCustomer"
            m={0}
          />
        </StyledFlexBox>
        <Accordion
          disabled={!selectedCustomer}
          selectedCustomer={selectedCustomer}
          expanded={accordionExpanded}
        />
      </StyledMainWidget>
      <Modal />
    </>
  );
};

export default MainWidget;
