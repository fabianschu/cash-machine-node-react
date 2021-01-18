import React from "react";
import styled from "styled-components";
import bottomWave from "../assets/bottom-wave.png";
import topCloud from "../assets/top-cloud.png";
import MainWidget from "../components/MainWidget";
import illustration from "../assets/cheese-carrier.png";
import AnalysisWidget from "../components/AnalysisWidget";

const MainPageLayout = styled.div`
  background: url(${illustration}) 20% 80% / auto 50% no-repeat,
    url(${topCloud}) 20% 0% / 120% 60% no-repeat,
    url(${bottomWave}) 20% 100% / 100% 100% no-repeat;
  min-height: 100vh;
  width: 100vw;
  padding: 60px 100px;
  background-attachment: fixed;
  .bottom-half {
    margin-top: ${({ theme }) => theme.spacing(5)}px;
    display: block;
    min-width: 700px;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
`;

const MainPage = () => {
  return (
    <MainPageLayout>
      <MainWidget />
      <div className="bottom-half">
        <AnalysisWidget />
      </div>
    </MainPageLayout>
  );
};

export default MainPage;
