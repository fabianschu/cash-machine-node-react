import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "140px",
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const ModalButton = (props) => {
  const { disabled, handleClick, type } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const renderIcon = () => {
    switch (type) {
      case "createCustomer":
        return <AddIcon />;
      case "createProject":
        return <AddIcon />;
      case "editCustomer":
        return <EditIcon />;
      case "print":
        return <PictureAsPdfIcon />;
      default:
        return null;
    }
  };

  const renderCaption = () => {
    switch (type) {
      case "createCustomer":
        return "Erstellen";
      case "editCustomer":
        return "Bearbeiten";
      case "print":
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
      case "print":
        return "secondary";
      case "createProject":
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <Box>
      <Button
        color={renderBackgroundColor()}
        className={classes.root}
        variant="contained"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(handleClick());
        }}
        startIcon={renderIcon()}
      >
        {renderCaption()}
      </Button>
    </Box>
  );
};

export default ModalButton;
