import React from "react";
import styled from "styled-components";

const StyledSubHeading = styled.div`
  min-width: 250px;
  h2 {
    text-align: left;
    font: Brandon;
    color: #6ea5a2;
    opacity: 1;
    font-size: ${({ theme }) => theme.typography.fontSizes.medium};
    text-transform: uppercase;
  }
`;

const SubHeading = (props) => {
  const { children } = props;

  return (
    <StyledSubHeading>
      <h2>{children}</h2>
    </StyledSubHeading>
  );
};

export default SubHeading;
