import React from "react";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form, Field } from "formik";
import InputField from "./Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProject,
  toggleProjectCreation,
} from "../redux/actions/projectsAction";
import StyledHeading from "../styled/Heading";
import StyledSoftButton from "../styled/SoftButton";
import StyledDialogActions from "../styled/DialogActions";

const ProjectSchema = Yup.object().shape({
  name: Yup.string()
    .required("Notwendig")
    .min(2, "Zu kurz!")
    .max(30, "Zu lang (max. 100 Zeichen)"),
  description: Yup.string()
    .required("Notwendig")
    .min(2, "Zu kurz!")
    .max(30, "Zu lang (max. 400 Zeichen)"),
  hours: Yup.number("Gültiges Format: Zahl")
    .required("Notwendig")
    .positive("Gültiges Format: Zahl"),
});

const ProjectForm = () => {
  const dispatch = useDispatch();

  const selectedCustomer = useSelector(
    ({ customersReducer }) => customersReducer.selectedCustomer
  );

  const handleSubmit = async (values) => {
    dispatch(saveProject(values));
    closeModal();
  };

  const closeModal = () => {
    dispatch(toggleProjectCreation());
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        hours: "",
        customerId: selectedCustomer.id,
      }}
      onSubmit={handleSubmit}
      validationSchema={ProjectSchema}
    >
      {() => (
        <Form>
          <DialogTitle>
            <StyledHeading small>Neues Projekt</StyledHeading>
          </DialogTitle>
          <DialogContent>
            <Field component={InputField} name="name" label="Titel" />
            <Field
              component={InputField}
              name="description"
              label="Beschreibung"
            />
            <Field
              component={InputField}
              name="hours"
              label="Stundenanzahl"
              type="number"
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

export default ProjectForm;
