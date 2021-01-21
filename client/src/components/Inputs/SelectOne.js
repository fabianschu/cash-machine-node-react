import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledAutocomplete = styled(Autocomplete)`
  max-width: 600px;
  flex: 1;
  margin: ${({ theme }) => `0 ${theme.spacing(2)}px;`};
`;

const SelectOne = (props) => {
  const { options, selected, handleSelection, disabled, type, display } = props;
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch();

  return (
    <StyledAutocomplete
      value={selected}
      inputValue={inputValue}
      disabled={disabled}
      options={options}
      getOptionLabel={(option) => {
        if (!option) return "";
        return option[display];
      }}
      getOptionSelected={(option, selected) => option.id === selected.id}
      renderOption={(option, { s }) => {
        return <React.Fragment>{option[display]}</React.Fragment>;
      }}
      onChange={(e, newValue, reason) => {
        dispatch(handleSelection(newValue ? newValue.id : null));
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
