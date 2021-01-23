import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, Field } from "formik";
import InputField from "./Inputs/InputField";
import StyledSubHeading from "../styled/SubHeading";
import StyledSoftButton from "../styled/SoftButton";
import StyledDialogActions from "../styled/DialogActions";
import FileUploadField from "./Inputs/FileUploadField";
import {
  updateUser,
  saveUser,
  toggleUserProfileEdit,
} from "../redux/actions/userAction";

const UserProfile = () => {
  const user = useSelector(({ userReducer }) => userReducer.user);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(updateUser(values));
    // if (user.id) {
    //   dispatch(updateUser(values));
    // } else {
    //   dispatch(saveUser(values));
    // }
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
            <StyledSubHeading>Eigene Daten</StyledSubHeading>
          </DialogTitle>
          <DialogContent>
            <Field component={InputField} name="name" label="Name" />
            <Field
              component={FileUploadField}
              name="logo"
              label="Logo"
              type="file"
            />
            <Field component={InputField} name="street" label="Straße" />
            <Field component={InputField} name="zip" label="Postleitzahl" />
            <Field component={InputField} name="city" label="Stadt" />
            <Field component={InputField} name="email" label="E-Mail" />
            <Field component={InputField} name="phone" label="Telefon" />
            <Field component={InputField} name="iban" label="IBAN" />
            <Field component={InputField} name="bic" label="BIC" />
            <Field component={InputField} name="taxId" label="Steuernummer" />
            <Field
              component={InputField}
              name="uId"
              label="Umsatzsteuernummer"
            />
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
