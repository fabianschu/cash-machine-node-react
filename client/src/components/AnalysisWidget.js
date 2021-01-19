import React from "react";
import styled from "styled-components";
import dataAnalysis from "../helpers/dataAnalysis";
import { useSelector } from "react-redux";
import StyledWidgetContainer from "../styled/WidgetContainer";
import Counter from "./Counter";
import { LineChart, Line } from "recharts";

const StyledAnalysisContainer = styled(StyledWidgetContainer)`
  width: 60%;
  min-width: 700px;
  height: 100%;
`;

const StyledHeading = styled.h1`
  text-align: left;
  font: Brandon;
  color: #6ea5a2;
  opacity: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const StyledCounters = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
`;

const AnalysisWidget = () => {
  const invoices = useSelector(
    ({ invoicesReducer }) => invoicesReducer.invoices
  );
  const projects = useSelector(
    ({ projectsReducer }) => projectsReducer.projects
  );

  dataAnalysis(invoices, projects);

  return (
    <StyledAnalysisContainer>
      <StyledHeading>Diesen Monat</StyledHeading>
      <StyledCounters>
        <Counter />
        <Counter />
        <Counter />
      </StyledCounters>
    </StyledAnalysisContainer>
  );
};

export default AnalysisWidget;
