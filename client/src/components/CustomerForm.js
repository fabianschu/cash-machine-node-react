import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UiContext } from "../context/UiContext";
import { Formik, Form, Field } from "formik";
import InputField from "./InputField";
import FloatInputField from "./FloatInputField";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firm: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const CustomerForm = () => {
  const {
    closeModal,
    editingCustomer,
    selectedCustomer,
    modifyCustomers,
  } = useContext(UiContext);

  const handleSubmit = async (values) => {
    await modifyCustomers(values);
    closeModal();
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
          <DialogTitle id="responsive-dialog-title">
            {"Neuen Kunden Erstellen"}
          </DialogTitle>
          <DialogContent>
            <Field component={InputField} name="firm" />
            <Field component={InputField} name="firstName" />
            <Field component={InputField} name="lastName" />
            <Field component={InputField} name="street" />
            <Field component={InputField} name="zip" />
            <Field component={InputField} name="city" />
            <Field component={InputField} name="country" />
            <Field component={FloatInputField} name="hourlyRate" />
            <Field component={InputField} name="taxId" />
          </DialogContent>
          <DialogActions>
            <Box mr="auto">
              {editingCustomer && (
                <Button
                  onClick={() =>
                    handleSubmit({ ...props.values, active: false })
                  }
                >
                  Löschen
                </Button>
              )}
            </Box>
            <Button autoFocus onClick={closeModal} color="primary">
              Abbrechen
            </Button>
            <Button color="primary" autoFocus variant="contained" type="submit">
              {getButtonCaption()}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerForm;
