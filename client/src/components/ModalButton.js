import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
    width: "140px",
    display: "flex",
    justifyContent: "flex-start",
    // color: "white",
    // backgroundColor: "black",
    // height: "50px",
    // backgroundImage:
    //   "linear-gradient(to left bottom, #2d047a, #280672, #240869, #200861, #1c0959, #1c0954, #1b0a4e, #1b0a49, #1c0a45, #1d0b42, #1e0b3e, #1e0c3b)",
  },
}));

const ModalButton = (props) => {
  const { disabled, handleClick, currentState, type } = props;
  const classes = useStyles();

  const renderIcon = () => {
    switch (type) {
      case "create":
        return <AddIcon />;
      case "edit":
        return <EditIcon />;
      case "print":
        return <PictureAsPdfIcon />;
      default:
        return null;
    }
  };

  const renderCaption = () => {
    switch (type) {
      case "create":
        return "Erstellen";
      case "edit":
        return "Bearbeiten";
      case "print":
        return "Rechnung";
      default:
        return null;
    }
  };

  const renderBackgroundColor = () => {
    switch (type) {
      case "create":
        return "primary";
      case "print":
        return "secondary";
      default:
        return "default";
    }
  };

  const renderMargin = () => {
    if (type === "print" || type === "edit") return 0;
    return 2;
  };

  return (
    <Box m={renderMargin()} mt={2}>
      <Button
        color={renderBackgroundColor()}
        className={classes.root}
        variant="contained"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(!currentState);
        }}
        startIcon={renderIcon()}
      >
        {renderCaption()}
      </Button>
    </Box>
  );
};

export default ModalButton;
