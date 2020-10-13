import React from "react";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const InputField = (props) => {
  const { name } = props.field;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getLabel = () => {
    if (name === "firm") return "Firma";
    if (name === "firstName") return "Vorname";
    if (name === "lastName") return "Nachname";
    if (name === "city") return "Ort";
    if (name === "zip") return "Postleitzahl";
    if (name === "street") return "Straße";
    if (name === "country") return "Land";
    if (name === "hourlyRate") return "Stundensatz";
    if (name === "username") return "Username";
    if (name === "password") return "Passwort";
    if (name === "name") return "Projektname";
    if (name === "description") return "Beschreibung";
    if (name === "hours") return "Stundenanzahl";
    if (name === "taxId") return "Steuernummer";
  };

  const getType = () => {
    if (name === "password") return "password";
    if (name === "hourlyRate") return "number";
    return "text";
  };

  if (name === "country")
    return (
      <FormControl variant="outlined" fullWidth size="small" margin="normal">
        <InputLabel id="demo-simple-select-outlined-label">
          {getLabel()}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label={getLabel()}
        >
          <MenuItem value={"Deutschland"}>Deutschland</MenuItem>
          <MenuItem value={"Österreich"}>Österreich</MenuItem>
        </Select>
      </FormControl>
    );

  return (
    <TextField
      type={getType()}
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

export default InputField;
