import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { UiContext } from "../context/UiContext";
import CustomerForm from "./CustomerForm";
import ProjectForm from "./ProjectForm";
import InvoiceOverview from "./InvoiceOverview";

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    closeModal,
    creatingCustomer,
    editingCustomer,
    creatingInvoice,
    creatingProject,
  } = useContext(UiContext);

  const renderModalContent = () => {
    if (creatingCustomer || editingCustomer) {
      return <CustomerForm />;
    } else if (creatingInvoice) {
      return <InvoiceOverview />;
    } else if (creatingProject) {
      return <ProjectForm />;
    }
  };
  console.log(creatingProject);
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
        onClose={closeModal}
        aria-labelledby="responsive-dialog-title"
      >
        {renderModalContent()}
      </Dialog>
    </div>
  );
};

export default Modal;
