import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const StyledSoftButton = withStyles((theme) => ({
  label: {
    fontSize: theme.typography.fontSizes.small,
  },
}))(Button);

const SoftButton = (props) => {
  const { children } = props;

  return <StyledSoftButton {...props}>{children}</StyledSoftButton>;
};

export default SoftButton;
