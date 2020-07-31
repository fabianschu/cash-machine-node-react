import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const InputField = (props) => {
  const { name } = props.field;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  const getLabel = () => {
    if (name === "firm") return "Firma";
    if (name === "firstName") return "Vorname";
    if (name === "lastName") return "Nachname";
    if (name === "city") return "Ort";
    if (name === "zip") return "Postleitzahl";
    if (name === "street") return "Straße";
    if (name === "country") return "Land";
    if (name === "hourlyRate") return "Stundensatz";
  };

  return (
    <TextField
      type="text"
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
      // {...field}
    />
  );
};

export default InputField;
