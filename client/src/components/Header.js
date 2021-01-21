import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserProfileEdit } from "../redux/actions/userAction";
import { logout } from "../redux/actions/authAction";

const StyledHeaderContainer = styled.div`
  height: 60px;
  width: 100%;
  min-width: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledIconButton = withStyles({
  root: {
    color: "#707070",
  },
})(IconButton);

const Header = () => {
  const dispatch = useDispatch();
  const handleOpenProfile = () => {
    dispatch(toggleUserProfileEdit());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <StyledHeaderContainer>
      <StyledIconButton onClick={handleOpenProfile}>
        <AccountBoxIcon fontSize="large" />
      </StyledIconButton>
      <StyledIconButton onClick={handleLogout}>
        <ExitToAppIcon fontSize="large" />
      </StyledIconButton>
    </StyledHeaderContainer>
  );
};

export default Header;
