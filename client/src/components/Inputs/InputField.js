import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const InputField = (props) => {
  const {
    field: { name },
    label,
    type,
  } = props;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  return (
    <TextField
      type={type || "text"}
      id={name}
      label={label}
      variant="outlined"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      fullWidth
      error={meta.touched && meta.error ? true : false}
      helperText={(meta.touched && meta.error) || ""}
      size="medium"
      margin="normal"
    />
  );
};

export default InputField;
