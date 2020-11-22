import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UiContext } from "../context/UiContext";
import { Formik, Form, Field } from "formik";
import InputField from "./InputField";
import FloatInputField from "./FloatInputField";
import { DataContext } from "../context/DataContext";
import { ProjectContext } from "../context/ProjectContext";

const ProjectForm = () => {
  const { closeModal, selectedCustomer } = useContext(UiContext);
  const { addProject } = useContext(DataContext);
  const { postProject } = useContext(ProjectContext);

  const handleSubmit = async (values) => {
    // addProject(values);
    postProject(values);
    closeModal();
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
    >
      {() => (
        <Form>
          <DialogTitle id="responsive-dialog-title">
            {"Neues Projekt"}
          </DialogTitle>
          <DialogContent>
            <Field component={InputField} name="name" />
            <Field component={InputField} name="description" />
            <Field component={FloatInputField} name="hours" />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeModal} color="primary">
              Abbrechen
            </Button>
            <Button color="primary" autoFocus variant="contained" type="submit">
              Speichern
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
