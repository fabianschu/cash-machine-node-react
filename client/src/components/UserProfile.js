import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, Field } from "formik";
import InputField from "./Inputs/InputField";
import StyledSoftButton from "../styled/SoftButton";
import StyledDialogActions from "../styled/DialogActions";
import FileUploadField from "./Inputs/FileUploadField";
import { updateUser, toggleUserProfileEdit } from "../redux/actions/userAction";
import StyledInputContainer from "../styled/InputContainer";
import StyledHeading from "../styled/Heading";

const StyledLogoContainer = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledCustomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47%;
`;

const UserProfile = () => {
  const user = useSelector(({ userReducer }) => userReducer.user);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUser(values));
    closeModal();
  };

  const closeModal = () => {
    dispatch(toggleUserProfileEdit());
  };

  return (
    <Formik
      initialValues={
        user || {
          name: "",
          street: "",
          zip: "",
          city: "",
          email: "",
          phone: "",
          iban: "",
          bic: "",
          taxId: "",
          userId: "",
        }
      }
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <DialogTitle>
            <StyledHeading small>Eigene Daten</StyledHeading>
          </DialogTitle>
          <DialogContent>
            <StyledInputContainer>
              <StyledCustomWrapper>
                <Field component={InputField} name="name" label="Name" />
                <Field component={InputField} name="street" label="Straße" />
              </StyledCustomWrapper>
              <StyledLogoContainer>
                <img src={user.logoUrl} alt="logo" />
                <Field
                  component={FileUploadField}
                  name="logo"
                  label="Logo"
                  type="file"
                />
              </StyledLogoContainer>
            </StyledInputContainer>
            <StyledInputContainer>
              <Field
                component={InputField}
                name="zip"
                label="Postleitzahl"
                flexWidth
              />
              <Field
                component={InputField}
                name="city"
                label="Stadt"
                flexWidth
              />
            </StyledInputContainer>

            <StyledInputContainer>
              <Field
                component={InputField}
                name="email"
                label="E-Mail"
                flexWidth
              />
              <Field
                component={InputField}
                name="phone"
                label="Telefon"
                flexWidth
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <Field
                component={InputField}
                name="taxId"
                label="Steuernummer"
                flexWidth
              />
              <Field
                component={InputField}
                name="uId"
                label="Umsatzsteuernummer"
                flexWidth
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <Field
                component={InputField}
                name="iban"
                label="IBAN"
                flexWidth
              />
              <Field component={InputField} name="bic" label="BIC" flexWidth />
            </StyledInputContainer>
          </DialogContent>
          <StyledDialogActions>
            <StyledSoftButton onClick={closeModal}>Abbrechen</StyledSoftButton>
            <Button color="primary" variant="contained" type="submit">
              Speichern
            </Button>
          </StyledDialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfile;
