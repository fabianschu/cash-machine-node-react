import React from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CustomerForm from "./CustomerForm";
import ProjectForm from "./ProjectForm";
import InvoiceOverview from "./InvoiceOverview";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const creatingCustomer = useSelector(
    ({ customersReducer }) => customersReducer.creatingCustomer
  );
  const editingCustomer = useSelector(
    ({ customersReducer }) => customersReducer.editingCustomer
  );
  const creatingInvoice = useSelector(
    ({ invoicesReducer }) => invoicesReducer.creatingInvoice
  );
  const creatingProject = useSelector(
    ({ projectsReducer }) => projectsReducer.creatingProject
  );
  const editingUserProfile = useSelector(
    ({ userReducer }) => userReducer.editingUserProfile
  );

  const closeModals = () => {
    if (creatingCustomer) dispatch({ type: "TOGGLE_CUSTOMER_CREATION" });
    if (editingCustomer) dispatch({ type: "TOGGLE_CUSTOMER_EDIT" });
    if (creatingInvoice) dispatch({ type: "TOGGLE_INVOICE_CREATION" });
    if (creatingProject) dispatch({ type: "TOGGLE_PROJECT_CREATION" });
    if (editingUserProfile) dispatch({ type: "TOGGLE_USER_EDIT" });
  };

  const renderModalContent = () => {
    if (creatingCustomer || editingCustomer) {
      return <CustomerForm />;
    } else if (creatingInvoice) {
      return <InvoiceOverview />;
    } else if (creatingProject) {
      return <ProjectForm />;
    } else if (editingUserProfile) {
      return <UserProfile />;
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={"md"}
      fullWidth={true}
      open={
        creatingCustomer ||
        editingCustomer ||
        creatingInvoice ||
        creatingProject ||
        editingUserProfile
      }
      onClose={closeModals}
      aria-labelledby="responsive-dialog-title"
    >
      {renderModalContent()}
    </Dialog>
  );
};

export default Modal;
