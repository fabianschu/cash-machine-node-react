import React from "react";
import styled from "styled-components";
import bottomWave from "../assets/bottom-wave.png";
import topCloud from "../assets/top-cloud.png";
import MainWidget from "../components/MainWidget";

const MainPageLayout = styled.div`
  background: url(${topCloud}) 20% 0% / 120% 60% no-repeat,
    url(${bottomWave}) 20% 100% / 100% 100% no-repeat;
  min-height: 100vh;
  width: 100vw;
  padding: 60px 100px;
  background-attachment: fixed;
`;

const MainPage = () => {
  return (
    <MainPageLayout>
      <MainWidget />
    </MainPageLayout>
  );
};

export default MainPage;
