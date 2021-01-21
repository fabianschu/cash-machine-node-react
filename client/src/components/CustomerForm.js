import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { saveCustomer, updateCustomer } from "../redux/actions/customersAction";
import styled from "styled-components";
import {
  toggleCustomerCreation,
  toggleCustomerEdit,
} from "../redux/actions/customersAction";
import InputField from "./Inputs/InputField";
import SelectField from "./Inputs/SelectField";
import StyledSubHeading from "../styled/SubHeading";
import StyledSoftButton from "../styled/SoftButton";
import StyledDialogActions from "../styled/DialogActions";

const StyledDeleteButtonContainer = styled.div`
  flex: 1;
`;

const SignupSchema = Yup.object().shape({
  firm: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const CustomerForm = () => {
  const selectedCustomer = useSelector(
    ({ customersReducer }) => customersReducer.selectedCustomer
  );
  const editingCustomer = useSelector(
    ({ customersReducer }) => customersReducer.editingCustomer
  );
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (editingCustomer) {
      dispatch(updateCustomer(values));
    } else {
      dispatch(saveCustomer(values));
    }
    closeModal();
  };

  const closeModal = () => {
    if (editingCustomer) {
      dispatch(toggleCustomerEdit());
    } else {
      dispatch(toggleCustomerCreation());
    }
  };

  const getInitialValues = () => {
    if (editingCustomer) {
      return selectedCustomer;
    }
    return {
      firm: "",
      firstName: "",
      lastName: "",
      street: "",
      zip: "",
      city: "",
      country: "",
      taxId: "",
      hourlyRate: "",
    };
  };

  const getButtonCaption = () => {
    if (editingCustomer) {
      return "Speichern";
    }
    return "Erstellen";
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <DialogTitle>
            <StyledSubHeading>
              {editingCustomer
                ? "Kundendaten berarbeiten"
                : "Kund*in erstellen"}
            </StyledSubHeading>
          </DialogTitle>
          <DialogContent>
            <Field component={InputField} name="firm" label="Firma" />
            <Field component={InputField} name="firstName" label="Vorname" />
            <Field component={InputField} name="lastName" label="Nachname" />
            <Field component={InputField} name="street" label="Straße" />
            <Field component={InputField} name="zip" label="Postleitzahl" />
            <Field component={InputField} name="city" label="Stadt" />
            <Field component={SelectField} name="country" label="Land" />
            <Field
              component={InputField}
              name="hourlyRate"
              label="Stundensatz"
              type="number"
            />
            <Field component={InputField} name="taxId" label="Steuernummer" />
          </DialogContent>
          <StyledDialogActions>
            {editingCustomer && (
              <StyledDeleteButtonContainer>
                <StyledSoftButton
                  onClick={() => {
                    handleSubmit({ ...props.values, active: false });
                  }}
                >
                  Löschen
                </StyledSoftButton>
              </StyledDeleteButtonContainer>
            )}
            <StyledSoftButton onClick={closeModal}>Abbrechen</StyledSoftButton>
            <Button color="primary" variant="contained" type="submit">
              {getButtonCaption()}
            </Button>
          </StyledDialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerForm;
