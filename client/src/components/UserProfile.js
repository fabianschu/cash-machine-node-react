import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
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

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Zu kurz!")
    .max(30, "Zu lang (max. 30 Zeichen)")
    .required("Notwendig"),
  street: Yup.string()
    .required("Notwendig")
    .max(50, "Zu lang (max. 50 Zeichen)"),
  zip: Yup.string().required("Notwendig").max(30, "Zu lang (max. 30 Zeichen)"),
  city: Yup.string().required("Notwendig").max(30, "Zu lang (max. 30 Zeichen)"),
  email: Yup.string()
    .required("Notwendig")
    .email("Ungültige E-Mail Adresse")
    .max(30, "Zu lang (max. 30 Zeichen)"),
  phone: Yup.string()
    .required("Notwendig")
    .max(30, "Zu lang (max. 30 Zeichen)"),
  iban: Yup.string().required("Notwendig").max(30, "Zu lang (max. 30 Zeichen)"),
  bic: Yup.string().required("Notwendig").max(30, "Zu lang (max. 30 Zeichen)"),
});

const UserProfile = () => {
  const user = useSelector(({ userReducer }) => userReducer.user);
  const dispatch = useDispatch();

  const setCorrectImage = (values) => {
    if (values.logo) {
      console.log(values);
      return values;
    } else {
      return { ...values, logoUrl: user.logoUrl };
    }
  };

  const handleSubmit = (values) => {
    dispatch(updateUser(setCorrectImage(values)));
  };

  const closeModal = () => {
    dispatch(toggleUserProfileEdit());
  };

  return (
    <Formik
      initialValues={
        user.name
          ? user
          : {
              name: "",
              street: "",
              zip: "",
              city: "",
              email: "",
              phone: "",
              iban: "",
              bic: "",
              taxId: "",
              uId: "",
              logoUrl: undefined,
            }
      }
      validationSchema={ProfileSchema}
      onSubmit={handleSubmit}
    >
      {(form) => {
        return (
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
                <Field
                  component={InputField}
                  name="bic"
                  label="BIC"
                  flexWidth
                />
              </StyledInputContainer>
            </DialogContent>
            <StyledDialogActions>
              <StyledSoftButton onClick={closeModal}>
                Abbrechen
              </StyledSoftButton>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={form.isSubmitting}
              >
                Speichern
              </Button>
            </StyledDialogActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserProfile;
