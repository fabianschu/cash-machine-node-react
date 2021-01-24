import React, { useState } from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const FileUploadField = (props) => {
  const {
    field: { name },
    type,
    value,
  } = props;
  const [error, setError] = useState("");
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const getFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onload = (e) => {
      const img = new Image();
      img.onload = function () {
        var height = img.height;
        var width = img.width;
        if (height > 100 || width > 400) {
          setError("Maximale Maße: 100px hoch, 400px breit");
          return;
        }
        setError("");
        setValue(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <TextField
      type={type || "text"}
      fullWidth
      id={name}
      value={value}
      variant="outlined"
      onChange={(e) => getFile(e)}
      error={!!error}
      helperText={error}
      size="medium"
      margin="normal"
    />
  );
};

export default FileUploadField;
