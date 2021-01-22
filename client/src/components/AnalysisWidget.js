import React from "react";
import styled from "styled-components";
import dataAnalysis from "../helpers/dataAnalysis";
import { useSelector } from "react-redux";
import StyledWidgetContainer from "../styled/WidgetContainer";
import Counter from "./Counter";
import BarChart from "./BarChart";

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
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const StyledChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnalysisWidget = () => {
  const invoices = useSelector(
    ({ invoicesReducer }) => invoicesReducer.invoices
  );
  const projects = useSelector(
    ({ projectsReducer }) => projectsReducer.projects
  );

  const data = dataAnalysis(invoices, projects);

  return (
    <StyledAnalysisContainer>
      <StyledHeading>Diesen Monat</StyledHeading>
      {invoices && projects && (
        <>
          <StyledCounters>
            <Counter
              label={data.month.totalHours.label}
              formattedNumber={data.month.totalHours.count}
            />
            <Counter
              label={data.month.billedHours.label}
              formattedNumber={data.month.billedHours.count}
            />
            <Counter
              label={data.month.billedSum.label}
              formattedNumber={"€" + data.month.billedSum.count / 100}
            />
          </StyledCounters>
          <StyledHeading>Letzte 12 Monate</StyledHeading>
          <StyledChartWrapper>
            <BarChart data={data.year} />
          </StyledChartWrapper>
        </>
      )}
    </StyledAnalysisContainer>
  );
};

export default AnalysisWidget;
