import styled from "styled-components";

const StyledWidgetContainer = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: ${({ theme }) => theme.rounded};
  padding: ${({ theme }) => `${theme.spacing(5)}px`};
`;

export default StyledWidgetContainer;
