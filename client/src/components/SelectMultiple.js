import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { customers } from "./data.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectMultiple = (props) => {
  const { disabled } = props;
  const classes = useStyles();
  const firstNames = (customers) => {
    return customers.map((customer) => customer.firstName);
  };

  return (
    <Autocomplete
      multiple
      disabled={disabled}
      id="checkboxes-tags-demo"
      options={customers}
      disableCloseOnSelect
      className={classes.formControl}
      getOptionLabel={(customer) => customer.firstName}
      renderOption={(customer, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {customer.firstName}
        </React.Fragment>
      )}
      // style={{ width: 500 }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label="Checkboxes"
            placeholder="Kunden"
          />
        );
      }}
    />
  );
};

export default SelectMultiple;
