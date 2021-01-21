import React from "react";
import { useField } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectField = (props) => {
  const {
    field: { name },
    label,
  } = props;
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  return (
    <FormControl variant="outlined" fullWidth size="small" margin="normal">
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={label}
      >
        <MenuItem value={"Deutschland"}>Deutschland</MenuItem>
        <MenuItem value={"Österreich"}>Österreich</MenuItem>
        <MenuItem value={"Vereinigtes Königreich"}>
          Vereinigtes Königreich
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectField;
