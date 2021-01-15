import React from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CustomerForm from "./CustomerForm";
import ProjectForm from "./ProjectForm";
import InvoiceOverview from "./InvoiceOverview";
import { useDispatch, useSelector } from "react-redux";

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

  const renderModalContent = () => {
    if (creatingCustomer || editingCustomer) {
      return <CustomerForm />;
    } else if (creatingInvoice) {
      return <InvoiceOverview />;
    } else if (creatingProject) {
      return <ProjectForm />;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"md"}
        fullWidth={true}
        open={
          creatingCustomer ||
          editingCustomer ||
          creatingInvoice ||
          creatingProject
        }
        aria-labelledby="responsive-dialog-title"
      >
        {renderModalContent()}
      </Dialog>
    </div>
  );
};

export default Modal;
