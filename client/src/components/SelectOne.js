import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    flexGrow: 1,
    minWidth: "200px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectOne = (props) => {
  const classes = useStyles();
  const { options, selected, handleSelection, disabled, type, display } = props;
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch();

  return (
    <Autocomplete
      value={selected}
      inputValue={inputValue}
      disabled={disabled}
      options={options}
      className={classes.formControl}
      getOptionLabel={(option) => {
        if (!option) return "";
        return option[display];
      }}
      renderOption={(option, { s }) => {
        return <React.Fragment>{option[display]}</React.Fragment>;
      }}
      onChange={(e, newValue, reason) => {
        // TODO: handle selection state
        dispatch(handleSelection(newValue.id));
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="outlined" label={type} />;
      }}
    />
  );
};

export default SelectOne;
