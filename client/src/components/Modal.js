import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { UiContext } from "../context/UiContext";
import CustomerForm from "./CustomerForm";
import InvoiceOverview from "./InvoiceOverview";

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    closeModal,
    creatingCustomer,
    editingCustomer,
    creatingInvoice,
  } = useContext(UiContext);

  const renderModalContent = () => {
    if (creatingCustomer || editingCustomer) {
      return <CustomerForm />;
    }
    if (creatingInvoice) {
      return <InvoiceOverview />;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"md"}
        fullWidth={true}
        open={creatingCustomer || editingCustomer || creatingInvoice}
        onClose={closeModal}
        aria-labelledby="responsive-dialog-title"
      >
        {renderModalContent()}
      </Dialog>
    </div>
  );
};

export default Modal;
