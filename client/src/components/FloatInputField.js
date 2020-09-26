import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const FloatInputField = (props) => {
  const { name } = props.field;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  const getLabel = () => {
    if (name === "hours") return "Anzahl Stunden";
    if (name === "hourlyRate") return "Stundensatz";
  };

  return (
    <TextField
      type="number"
      id={name}
      label={getLabel()}
      variant="outlined"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      fullWidth
      error={meta.touched && meta.error ? true : false}
      helperText={(meta.touched && meta.error) || ""}
      size="small"
      margin="normal"
    />
  );
};

export default FloatInputField;
