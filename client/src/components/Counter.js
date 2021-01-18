import React from "react";
import styled from "styled-components";

const StyledCounter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 120px;
  height: 70px;
`;

const StyledNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.large}};
  color: #707070;
  font-weight: bold;
`;

const StyleCounterLabel = styled.div`
  color: #707070;
  font-weight: bold;
`;

const Counter = () => {
  return (
    <StyledCounter>
      <StyleCounterLabel>Gesamtstunden</StyleCounterLabel>
      <StyledNumber>15</StyledNumber>
    </StyledCounter>
  );
};

export default Counter;
