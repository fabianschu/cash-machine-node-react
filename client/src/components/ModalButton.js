import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { useDispatch } from "react-redux";

const ModalButton = (props) => {
  const { disabled, handleClick, type } = props;
  const dispatch = useDispatch();

  const renderIcon = () => {
    switch (type) {
      case "createCustomer":
        return <AddIcon />;
      case "createProject":
        return <AddIcon />;
      case "createInvoice":
        return <PictureAsPdfIcon />;
      default:
        return null;
    }
  };

  const renderCaption = () => {
    switch (type) {
      case "createCustomer":
        return "Kund*in";
      case "createInvoice":
        return "Rechnung";
      case "createProject":
        return "Projekt";
      default:
        return null;
    }
  };

  const renderBackgroundColor = () => {
    switch (type) {
      case "createCustomer":
        return "primary";
      case "createInvoice":
        return "secondary";
      case "createProject":
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <Button
      color={renderBackgroundColor()}
      variant="contained"
      disabled={disabled}
      size="large"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(handleClick());
      }}
      startIcon={renderIcon()}
    >
      {renderCaption()}
    </Button>
  );
};

export default ModalButton;
