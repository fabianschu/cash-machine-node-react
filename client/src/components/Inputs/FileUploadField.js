import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const FileUploadField = (props) => {
  const {
    field: { name },
    label,
    type,
  } = props;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const getFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(reader);
    reader.onload = (e) => {
      console.log("loaded");
      setValue(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <TextField
      type={type || "text"}
      id={name}
      variant="outlined"
      onChange={(e) => getFile(e)}
      error={meta.touched && meta.error ? true : false}
      helperText={(meta.touched && meta.error) || ""}
      size="medium"
      margin="normal"
    />
  );
};

export default FileUploadField;
