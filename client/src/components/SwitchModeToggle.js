import React, { useContext } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { UiContext } from "../context/UiContext";
import { withStyles } from "@material-ui/core/styles";
import white from "./white.png";

const StyledToggleButton = withStyles((theme) => ({
  root: {
    border: "none",
    borderRadius: 0,
  },
  selected: {
    backgroundImage: `url('${white}')`,
  },
}))(ToggleButton);

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    borderRadius: 0,
  },
}))(ToggleButtonGroup);

export default function SwitchModeToggle() {
  const { mode, setMode, setSelectedProjects } = useContext(UiContext);

  const handleAlignment = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
    if (newMode === "work") {
      setSelectedProjects([]);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleAlignment}
      aria-label="mode"
    >
      <StyledToggleButton value="work" component="div">
        Work Mode
      </StyledToggleButton>
      <StyledToggleButton value="cash">Cash Mode</StyledToggleButton>
    </StyledToggleButtonGroup>
  );
}
