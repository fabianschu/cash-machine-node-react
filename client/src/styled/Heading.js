import React from "react";
import styled from "styled-components";

const StyledHeading = styled.div`
  text-align: left;
  font: Brandon;
  color: #6ea5a2;
  opacity: 1;
  font-size: ${({ theme, small }) =>
    small
      ? theme.typography.fontSizes.medium
      : theme.typography.fontSizes.xlarge};
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledSpacer = styled.div`
  border: 4px solid #fbd937;
  height: 0px;
  width: ${({ small }) => (small ? 30 : 50)}px;
  margin: ${({ theme, small }) =>
      small ? theme.spacing(1) : theme.spacing(2)}px
    0;
`;

const Heading = (props) => {
  const { children, small } = props;

  return (
    <>
      <StyledHeading small={small}>{children}</StyledHeading>
      <StyledSpacer small={small} />
    </>
  );
};

export default Heading;
