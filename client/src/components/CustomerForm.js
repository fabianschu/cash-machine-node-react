import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UiContext } from "../context/UiContext";
import { CustomersContext } from "../context/CustomersContext";
import { Formik, Form, Field } from "formik";
import InputField from "./InputField";
import axios from "axios";
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
    creatingCustomer,
    editingCustomer,
    setSelectedCustomer,
    selectedCustomer,
  } = useContext(UiContext);
  const { setCustomers } = useContext(CustomersContext);

  const handleSubmit = async (values) => {
    try {
      let customer;
      if (editingCustomer) {
        customer = await axios.put(
          `http://localhost:5000/customers/${selectedCustomer.id}`,
          values
        );
      } else if (creatingCustomer) {
        customer = await axios.post(`http://localhost:5000/customers`, values);
      }
      const allCustomers = await axios.get("http://localhost:5000/customers");
      setCustomers(allCustomers.data);
      setSelectedCustomer(customer.data);
      closeModal();
    } catch (error) {
      console.log(error);
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
  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
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
          <Field component={InputField} name="hourlyRate" />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeModal} color="primary">
            Abbrechen
          </Button>
          <Button
            color="primary"
            autoFocus
            variant="contained"
            type="submit"
            // onClick={handleSubmit(props.values)}
          >
            Erstellen
          </Button>
        </DialogActions>
      </Form>
    </Formik>
  );
};

export default CustomerForm;
