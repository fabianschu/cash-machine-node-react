import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "47%")};
`;

const InputField = (props) => {
  const {
    field: { name },
    label,
    type,
    flexWidth,
  } = props;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  return (
    <StyledTextField
      type={type || "text"}
      id={name}
      label={label}
      variant="outlined"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      fullWidth={!flexWidth}
      error={meta.touched && meta.error ? true : false}
      helperText={(meta.touched && meta.error) || ""}
      size="medium"
      margin="normal"
    />
  );
};

export default InputField;
