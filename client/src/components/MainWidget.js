import React, { useEffect } from "react";
import ModalButton from "./ModalButton";
import Accordion from "./Accordion";
import SelectOne from "./SelectOne";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  selectCustomer,
  toggleCustomerCreation,
} from "../redux/actions/customersAction";
import { fetchProjects } from "../redux/actions/projectsAction";
import { fetchInvoices } from "../redux/actions/invoicesAction";
import styled from "styled-components";
import StyledSubHeading from "../styled/SubHeading";

const StyledWidgetBox = styled.div`
  border-radius: ${({ theme }) => theme.rounded};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  background-color: white;
  padding: ${({ theme }) =>
    `${theme.spacing(6)}px ${theme.spacing(6)}px 0 ${theme.spacing(6)}px`};
  min-width: 700px;
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

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProjects());
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <>
      <StyledWidgetBox>
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
        />
      </StyledWidgetBox>
      <Modal />
    </>
  );
};

export default MainWidget;
